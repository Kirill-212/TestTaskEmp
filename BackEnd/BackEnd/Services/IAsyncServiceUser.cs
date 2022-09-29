using System.Collections.Generic;
using System.Threading.Tasks;

namespace BackEnd.Services
{
    public interface IAsyncServiceUser<T>
    {
        Task Create(T user);

        Task Update(T user, string roleName);

        Task Delete(string email);

        Task<T> GetByEmail(string email);

        Task<IEnumerable<T>> Get();

        Task<IEnumerable<T>> GetUsersNotAddedToEmp();
    }
}
