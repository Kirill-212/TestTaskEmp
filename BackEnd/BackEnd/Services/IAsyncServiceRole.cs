using System.Collections.Generic;
using System.Threading.Tasks;

namespace BackEnd.Services
{
    public interface IAsyncServiceRole<T>
    {
        Task Create(T item);

        Task Update(string oldRoleName, string newRoleName);

        Task Delete(string item);

        Task<T> GetByName(string name);

        Task<IEnumerable<T>> Get();
    }
}
