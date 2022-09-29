using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace BackEnd.Auth
{
    public class AuthOptions
    {
        public const string ISSUER = "DDer";
        public const string AUDIENCE = "WERDSf3232ew";
        const string KEY = "werwerewr43fsdfdsfre3";
        public const int LIFETIME = 30;

        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
