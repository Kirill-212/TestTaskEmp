using System.Security.Claims;
using System.Threading.Tasks;

namespace BackEnd.Services
{
    public interface IAsyncServiceAuth<T>
    {
        Task<ClaimsIdentity> Auth(string email, string password);
    }
}
