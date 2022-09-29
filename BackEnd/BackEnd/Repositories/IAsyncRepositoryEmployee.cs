using System.Threading.Tasks;

namespace BackEnd.Repositories
{
    public interface IAsyncRepositoryEmployee<T> : IAsyncRepository<T>
    {
        Task<T> GetByEmail(string email);
    }
}
