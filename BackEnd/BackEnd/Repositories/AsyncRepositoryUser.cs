using BackEnd.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Repositories
{
    public class AsyncRepositoryUser :
        AsyncRepository<User>,
        IAsyncRepositoryUser<User>
    {
        public AsyncRepositoryUser(DataBaseContext dbContext) : base(dbContext)
        {
        }

        public override async Task<IEnumerable<User>> Get()
        {
            return await _dbContext.Users
                .Include(i => i.Role)
                .ToArrayAsync();
        }

        public async Task<User> GetByEmail(string email)
        {
            return await _dbContext.Users
                .Include(i => i.Role)
                .Where(i => i.Email == email)
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<User>> GetUsersNotAddedToEmp()
        {
            return await _dbContext.Users
                .Include(i => i.Employee)
                .Where(i => i.Employee == null)
                .ToListAsync();
        }
    }
}
