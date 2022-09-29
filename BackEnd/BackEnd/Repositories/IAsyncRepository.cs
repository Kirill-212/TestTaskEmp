using System.Collections.Generic;
using System.Threading.Tasks;

namespace BackEnd.Repositories
{
    public interface IAsyncRepository<T>
    {
        Task Add(T entity);

        Task Update(T entity);

        Task Delete(T entity);

        Task<IEnumerable<T>> Get();
    }
}
