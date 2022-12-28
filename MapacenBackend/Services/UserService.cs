using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using AutoMapper;
using MapacenBackend.Entities;
using MapacenBackend.Exceptions;
using MapacenBackend.Models;
using MapacenBackend.Models.UserDtos;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace MapacenBackend.Services;

public interface IUserService
{
    public User GetUser(LoginUserDto dto);
    public void RegisterUser(CreateUserDto dto);
    public TokenToReturn LoginUser(LoginUserDto dto);
    public string GenerateNewTokensForUser(User user);
    void ChangeUserCounty(int userId, int countyId);
    UserDto GetUser(int id);
}

public class UserService : IUserService
{
    private readonly MapacenDbContext _dbContext;
    private readonly IConfiguration _configuration;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IMapper _mapper;

    public UserService(MapacenDbContext dbContext, IConfiguration configuration, IHttpContextAccessor httpContextAccessor, IMapper mapper)
    {
        _dbContext = dbContext;
        _configuration = configuration;
        _httpContextAccessor = httpContextAccessor;
        _mapper = mapper;
    }

    public User GetUser(LoginUserDto dto)
    {
        return _dbContext
            .Users
            .FirstOrDefault(u => u != null && u.Email == dto.Email) ?? throw new NotFoundException();
    }

    public void RegisterUser(CreateUserDto dto)
    {
        CreatePasswordHash(dto.Password, out var passwordHash, out var passwordSalt);

        if (_dbContext.Users.Any(u => u != null && u.Email == dto.Email))
            throw new EmailAlreadyUsedException("Wpisany email jest już zajęty");

        _dbContext.Users.Add(new User
        {
            Name = dto.Name,
            Email = dto.Email,
            CanComment = true,
            CountyId = dto.CountyId,
            PasswordHash = passwordHash,
            PasswordSalt = passwordSalt,
            RoleID = dto.RoleId
        });
        _dbContext.SaveChanges();
    }

    public TokenToReturn LoginUser(LoginUserDto dto)
    {
        var user = GetUser(dto);

        if (dto.Password == null ||
            !VerifyPasswordHash(dto.Password, user.PasswordHash, user.PasswordSalt))
        {
            throw new InvalidLoginDataException("Niepoprawny login lub hasło");
        }

        string generatedNewToken = GenerateNewTokensForUser(user);

        //return new UserDto
        //{
        //    Name = user.Name,
        //    RoleName = user.Role.Name,
        //    Email = user.Email,
        //    CanComment = user.CanComment,
        //    County = new County
        //    {
        //        Id = user.County.Id,
        //        Name = user.County.Name
        //    },
        //    TokenContent = generatedNewToken
        //};

        return new TokenToReturn(generatedNewToken);
    }

    public string GenerateNewTokensForUser(User user)
    {
        var refreshToken = new RefreshToken();
        user.RefreshToken = refreshToken.Token;
        user.TokenCreated = refreshToken.Created;
        user.TokenExpires = refreshToken.Expires;

        _httpContextAccessor.HttpContext?.Response.Cookies.Append("refreshToken", refreshToken.Token, new CookieOptions
        {
            HttpOnly = true,
            Expires = refreshToken.Expires
        });

        _dbContext.SaveChanges();
        return CreateToken(user);
    }

    public void ChangeUserCounty(int userId, int countyId)
    {
        _dbContext
            .Users
            .FirstOrDefault(u => u.Id == userId)
            !.CountyId = countyId;

        _dbContext.SaveChanges();
    }

    public UserDto GetUser(int id)
    {
        var user = _dbContext
            .Users
            .Include(u => u.County)
            .Include(u => u.Role)
            .FirstOrDefault(u => u.Id == id);

        return new UserDto
        {
            Name = user.Name,
            RoleName = user.Role.Name,
            Email = user.Email,
            CanComment = user.CanComment,
            County = new County
            {
                Id = user.County.Id,
                Name = user.County.Name
            },
        };
    }


    private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
    {
        using var hmac = new HMACSHA512();
        passwordSalt = hmac.Key;
        passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
    }

    private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
    {
        using var hmac = new HMACSHA512(passwordSalt);
        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        return computedHash.SequenceEqual(passwordHash);
    }

    private string CreateToken(User user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
            _configuration.GetSection("Token").Value));

        var role = _dbContext.Roles.FirstOrDefault(r => r.Id == user.RoleID);

        var token = new JwtSecurityToken
        (
            claims: new List<Claim>
            {
                new(type:"userId", user.Id.ToString()),
                new(type:"role", user.Role.Name),
                new(type:"name", user.Name),
                new(type:"email", user.Email),
                new(type:"countyId", user.CountyId.ToString()),
                new(type:"canComment", user.CanComment.ToString())
            },
            expires: DateTime.Now.AddDays(1),
            signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature)
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}