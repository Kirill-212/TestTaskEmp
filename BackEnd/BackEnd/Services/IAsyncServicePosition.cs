using System.Collections.Generic;
using System.Threading.Tasks;

namespace BackEnd.Services
{
    public interface IAsyncServicePosition<T>
    {
        Task Create(T item);

        Task Update(T item, string newName);

        Task Delete(string name);

        Task<T> GetByName(string name);

        Task<IEnumerable<T>> Get();
    }
}
