using System.Threading.Tasks;

namespace BackEnd.Repositories
{
    public interface IAsyncRepositoryPosition<T> : IAsyncRepository<T>
    {
        Task<T> GetByName(string name);
    }
}
