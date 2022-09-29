using BackEnd.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Repositories
{
    public class AsyncRepositoryPosition :
        AsyncRepository<Position>,
        IAsyncRepositoryPosition<Position>
    {
        public AsyncRepositoryPosition(DataBaseContext dbContext) : base(dbContext)
        {
        }

        public async Task<Position> GetByName(string name)
        {
            return await _dbContext.Positions
                .Where(i => i.Name == name)
                .FirstOrDefaultAsync();
        }
    }
}
