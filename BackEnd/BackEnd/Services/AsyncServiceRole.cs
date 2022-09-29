using BackEnd.Exceptions;
using BackEnd.Models;
using BackEnd.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BackEnd.Services
{
    public class AsyncServiceRole : IAsyncServiceRole<Role>
    {

        private readonly IAsyncRepositoryRole<Role> asyncRepositoryRole;

        public AsyncServiceRole(
            IAsyncRepositoryRole<Role> asyncRepositoryRole
            )
        {
            this.asyncRepositoryRole = asyncRepositoryRole;

        }

        public async Task Create(Role item)
        {
            Role role = await asyncRepositoryRole.GetByName(item.RoleName);
            if (role != null)
                throw new BadRequestException("Role wuth this name alredy added");
            await asyncRepositoryRole.Add(item);
        }

        public async Task Delete(string item)
        {
            Role role = await asyncRepositoryRole.GetByName(item);
            if (role == null)
                throw new BadRequestException("Role with this name not found");
            await asyncRepositoryRole.Delete(role);
        }

        public async Task<IEnumerable<Role>> Get()
        {
            return await asyncRepositoryRole.Get();
        }

        public async Task<Role> GetByName(string name)
        {
            return await asyncRepositoryRole.GetByName(name);
        }

        public async Task Update(string oldRoleName, string newRoleName)
        {
            Role role = await asyncRepositoryRole.GetByName(oldRoleName);
            if (role == null)
                throw new BadRequestException("Role wuth this name not found");
            Role roleNew = await asyncRepositoryRole.GetByName(newRoleName);
            if (roleNew != null)
                throw new BadRequestException("Role wuth this name not found");
            role.RoleName = newRoleName;
            await asyncRepositoryRole.Update(role);
        }
    }
}
