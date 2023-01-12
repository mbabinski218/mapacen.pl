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
//using Database.Entities.Favourites;

namespace MapacenBackend.Services;

public interface IUserService
{
    User GetUser(LoginUserDto dto);
    void RegisterUser(CreateUserDto dto);
    TokenToReturn LoginUser(LoginUserDto dto);
    string GenerateNewTokensForUser(User user);
    void ChangeUserCounty(int userId, int countyId);
    UserDto GetUser(int id);
    IEnumerable<UserDto>? GetAllUsers();
    void BanUser(int userId);
    void UnbanUser(int userId);
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

        var favourites = _dbContext.Favourites.Add(new Favourites());
        _dbContext.SaveChanges();
        var favouritesId = favourites.Entity.Id;

        _dbContext.Users.Add(new User
        {
            Name = dto.Name,
            Email = dto.Email,
            CanComment = true,
            CountyId = dto.CountyId,
            PasswordHash = passwordHash,
            PasswordSalt = passwordSalt,
            RoleID = dto.RoleId,
            FavouritesId = favouritesId
        });
        _dbContext.SaveChanges();
    }

    public TokenToReturn LoginUser(LoginUserDto dto)
    {
        var user = GetUser(dto);

        if (dto.Password == null ||
            !VerifyPasswordHash(dto.Password, user.PasswordHash, user.PasswordSalt))
            throw new InvalidLoginDataException("Niepoprawny login lub hasło");

        string generatedNewToken = GenerateNewTokensForUser(user);
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
        var user = _dbContext
            .Users
            .FirstOrDefault(u => u.Id == userId)
            ?? throw new NotFoundException("User with requested id does not exist");

        user.CountyId = countyId;
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
            Id = user.Id,
            Name = user.Name,
            RoleName = user.Role.Name,
            Email = user.Email,
            CanComment = user.CanComment,
            County = new CountyDto
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
                new(type:"canComment", user.CanComment.ToString().ToLower()),
                new(type:"favouritesId", user.FavouritesId.ToString())
            },
            expires: DateTime.Now.AddDays(1),
            signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature)
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public IEnumerable<UserDto>? GetAllUsers()
    {
        var users = _dbContext
            .Users
            .Include(u => u.County)
            .Include(u => u.Role);

        return _mapper.Map<IEnumerable<UserDto>>(users);
    }

    public void BanUser(int userId)
    {
        var user = _dbContext
            .Users
            .Include(u => u.Comments)
            .FirstOrDefault(u => u.Id == userId)
            ?? throw new NotFoundException("Użytkownik nie istnieje");

        user.CanComment = false;
        _dbContext.RemoveRange(user.Comments);
        _dbContext.SaveChanges();
    }

    public void UnbanUser(int userId)
    {
        var user = _dbContext
            .Users
            .FirstOrDefault(u => u.Id == userId)
            ?? throw new NotFoundException("Użytkownik nie istnieje");

        user.CanComment = true;
        _dbContext.SaveChanges();
    }
}