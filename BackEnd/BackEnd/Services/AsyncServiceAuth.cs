using BackEnd.Exceptions;
using BackEnd.HashPassword;
using BackEnd.Models;
using BackEnd.Repositories;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BackEnd.Services
{
    public class AsyncServiceAuth : IAsyncServiceAuth<ClaimsIdentity>
    {
        private readonly IAsyncRepositoryUser<User> asyncRepositoryUser;

        public AsyncServiceAuth(IAsyncRepositoryUser<User> asyncRepositoryUser)
        {
            this.asyncRepositoryUser = asyncRepositoryUser;
        }

        public async Task<ClaimsIdentity> Auth(string email, string password)
        {
            User user = await asyncRepositoryUser.GetByEmail(email);
            if (user == null)
                throw new BadRequestException("User with this email not faund.");
            if (!HashPass.Verify(user.Password, password))
                throw new BadRequestException("Password is not valid.");
            var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, user.Email),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, user.Role.RoleName)
                };
            ClaimsIdentity claimsIdentity =
            new(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                ClaimsIdentity.DefaultRoleClaimType);
            return claimsIdentity;
        }

    }
}
