using System.Threading.Tasks;

namespace BackEnd.Repositories
{
    public interface IAsyncRepositoryRole<T> : IAsyncRepository<T>
    {
        Task<T> GetByName(string name);
    }
}
