using BackEnd.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Repositories
{
    public class AsyncRepositoryRole :
        AsyncRepository<Role>,
        IAsyncRepositoryRole<Role>
    {
        public AsyncRepositoryRole(DataBaseContext dbContext) : base(dbContext)
        {
        }

        public async Task<Role> GetByName(string name)
        {
            return await _dbContext.Roles
                .Where(i => i.RoleName == name)
                .FirstOrDefaultAsync();
        }
    }
}
