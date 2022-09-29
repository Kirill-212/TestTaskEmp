using BackEnd.Auth;
using BackEnd.Dto;
using BackEnd.Models;
using BackEnd.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAsyncServiceAuth<ClaimsIdentity> asyncServiceAuth;

        public AuthController(IAsyncServiceAuth<ClaimsIdentity> asyncServiceAuth)
        {
            this.asyncServiceAuth = asyncServiceAuth;
        }

        [HttpPost]
        public async Task<IActionResult> Auth([FromBody] AuthDto authDto)
        {
            if (ModelState.IsValid)
            {
                ClaimsIdentity identity = 
                    await asyncServiceAuth.Auth(
                        authDto.Email, authDto.Password
                        );
                var now = DateTime.UtcNow;
                var jwt = new JwtSecurityToken(
                        issuer: AuthOptions.ISSUER,
                        audience: AuthOptions.AUDIENCE,
                        notBefore: now,
                        claims: identity.Claims,
                        expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                        signingCredentials: new SigningCredentials(
                            AuthOptions.GetSymmetricSecurityKey(),
                            SecurityAlgorithms.HmacSha256)
                        );
                var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

                var response = new
                {
                    access_token = encodedJwt,
                    username = identity.Name
                };

                return Ok(response);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }


    }
}
