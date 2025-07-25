using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterDto
{
    [Required]
    [EmailAddress]
    public required string Email { get; set; }
    [Required]
    public required string DisplayName { get; set; }
    [Required]
    [MinLength(4)]
    public required string Password { get; set; }
}
