using BackEnd.Exceptions;
using BackEnd.HashPassword;
using BackEnd.Models;
using BackEnd.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BackEnd.Services
{
    public class AsyncServiceUser : IAsyncServiceUser<User>
    {
        private readonly IAsyncRepositoryUser<User> asyncRepository;
        private readonly IAsyncRepositoryRole<Role> asyncRepositoryRole;

        public AsyncServiceUser(
            IAsyncRepositoryUser<User> asyncRepository,
            IAsyncRepositoryRole<Role> asyncRepositoryRole
            )
        {
            this.asyncRepositoryRole = asyncRepositoryRole;
            this.asyncRepository = asyncRepository;
        }

        public async Task Create(User user)
        {
            if (await asyncRepository.GetByEmail(user.Email) != null)
                throw new BadRequestException("User with this email alredy added");
            Role role = await asyncRepositoryRole.GetByName(Roles.USER.ToString());
            if (role == null)
                throw new BadRequestException("Role User not found.");
            user.RoleId = role.Id;
            user.Password = HashPass.HashPasswordUser(user.Password);
            await asyncRepository.Add(user);
        }

        public async Task Delete(string email)
        {
            User user = await asyncRepository.GetByEmail(email);
            if (user == null) throw new BadRequestException("User with this email not found");
            await asyncRepository.Delete(user);
        }

        public async Task<IEnumerable<User>> Get()
        {
            return await asyncRepository.Get();
        }

        public async Task<User> GetByEmail(string email)
        {
            return await asyncRepository.GetByEmail(email);
        }

        public async Task<IEnumerable<User>> GetUsersNotAddedToEmp()
        {
            return await asyncRepository.GetUsersNotAddedToEmp();
        }

        public async Task Update(User item, string roleName)
        {
            User user = await asyncRepository.GetByEmail(item.Email);
            if (user == null)
                throw new BadRequestException("User with this email not found");
            Role role = await asyncRepositoryRole.GetByName(roleName);
            if (role == null)
                throw new BadRequestException("Role User not found.");
            user.RoleId = role.Id;
            if (item.Password != null)
                user.Password = HashPass.HashPasswordUser(item.Password);
            await asyncRepository.Update(user);
        }
    }
}
