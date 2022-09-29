using System.Collections.Generic;
using System.Threading.Tasks;

namespace BackEnd.Services
{
    public interface IAsyncServiceEmployee<T>
    {
        Task Create(T item, string email, string positionName);

        Task Update(T item, string email, string positionName, string roleName);

        Task Delete(string item);

        Task<T> GetByEmail(string name);

        Task<IEnumerable<T>> Get();
    }
}
