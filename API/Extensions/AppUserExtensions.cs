using API.DTOs;
using API.Entities;
using API.Interfaces;

namespace API.Extensions;

public static class AppUserExtensions
{
    public static UserDto toDto(this AppUser user,
    ITokenService _tokenService)
    {
        return new UserDto
        {
            Id = user.Id,
            DisplayName = user.DisplayName,
            Email = user.Email,
            ImageUrl=user.ImageUrl,
            Token = _tokenService.CreateToken(user)
        };
    }
}
