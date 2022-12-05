using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using MapacenBackend.Entities;
using MapacenBackend.Exceptions;
using MapacenBackend.Models;
using MapacenBackend.Models.UserDtos;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace MapacenBackend.Services;

public interface IUserService
{
    public User GetUser(UserDto dto);
    public void RegisterUser(CreateUserDto dto);
    public string LoginUser(UserDto dto);
    public string GenerateNewTokensForUser(User user);
}

public class UserService : IUserService
{
    private readonly MapacenDbContext _dbContext;
    private readonly IConfiguration _configuration;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public UserService(MapacenDbContext dbContext, IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
    {
        _dbContext = dbContext;
        _configuration = configuration;
        _httpContextAccessor = httpContextAccessor;
    }

    public User GetUser(UserDto dto)
    {
        return _dbContext.Users.FirstOrDefault(u => u != null && u.Email == dto.Email) ?? throw new NotFoundException();
    }

    public void RegisterUser(CreateUserDto dto)
    {
        CreatePasswordHash(dto.Password, out var passwordHash, out var passwordSalt);

        if (_dbContext.Users.Any(u => u != null && u.Email == dto.Email))
            throw new EmailAlreadyUsedException();

        _dbContext.Users.Add(new User
        {
            Name = dto.Name,
            Email = dto.Email,
            CanComment = true,
            CountyId = dto.CountyId,
            PasswordHash = passwordHash,
            PasswordSalt = passwordSalt,
            RoleID = 1
        });
        _dbContext.SaveChanges();
    }

    public string LoginUser(UserDto dto)
    {
        var user = GetUser(dto);

        if (dto.Password == null ||
            !VerifyPasswordHash(dto.Password, user.PasswordHash, user.PasswordSalt))
        {
            throw new InvalidLoginDataException();
        }

        return GenerateNewTokensForUser(user);
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
                new(ClaimTypes.Role, role.Name)
            },
            expires: DateTime.Now.AddDays(1),
            signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature)
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}