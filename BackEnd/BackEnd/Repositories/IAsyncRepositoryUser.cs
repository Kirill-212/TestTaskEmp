using System.Collections.Generic;
using System.Threading.Tasks;

namespace BackEnd.Repositories
{
    public interface IAsyncRepositoryUser<T> : IAsyncRepository<T>
    {
        Task<T> GetByEmail(string email);

        Task<IEnumerable<T>> GetUsersNotAddedToEmp();
    }
}
