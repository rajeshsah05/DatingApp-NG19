using System.Net;
using System.Text.Json;
using API.Errors;

namespace API.Middlewares;

public class ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> _logger,
IHostEnvironment env)
{
    public async Task InvokeAsync(HttpContext _context)
    {
        try
        {
            await next(_context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "{message}", ex.Message);
            _context.Response.ContentType = "application/json";
            _context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var response = env.IsDevelopment()
             ? new ApiException(_context.Response.StatusCode, ex.Message, ex.StackTrace)
             : new ApiException(_context.Response.StatusCode, ex.Message, "internal Server Error");

            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            var json = JsonSerializer.Serialize(response, options);

            await _context.Response.WriteAsync(json);
        }
    }
}
