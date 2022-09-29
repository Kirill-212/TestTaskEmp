using BackEnd.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Repositories
{
    public class AsyncRepositoryEmployee :
        AsyncRepository<Employee>,
        IAsyncRepositoryEmployee<Employee>
    {
        public AsyncRepositoryEmployee(DataBaseContext dbContext) : base(dbContext)
        {
        }

        public override async Task<IEnumerable<Employee>> Get()
        {
            return await _dbContext.Employees

                .Include(i => i.User.Role)
                .Include(i => i.Position)
                .ToArrayAsync();
        }

        public async Task<Employee> GetByEmail(string email)
        {
            return await _dbContext.Employees
                 .Include(i => i.User.Role)
                 .Include(i => i.Position)
                 .Where(i => i.User.Email == email)
                 .FirstOrDefaultAsync();
        }
    }
}
