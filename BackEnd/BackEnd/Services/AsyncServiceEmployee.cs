using BackEnd.Exceptions;
using BackEnd.Models;
using BackEnd.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BackEnd.Services
{
    public class AsyncServiceEmployee : IAsyncServiceEmployee<Employee>
    {
        private readonly IAsyncRepositoryEmployee<Employee> asyncRepositoryEmployee;
        private readonly IAsyncRepositoryPosition<Position> asyncRepositoryPosition;
        private readonly IAsyncRepositoryUser<User> asyncRepositoryUser;
        private readonly IAsyncRepositoryRole<Role> asyncRepositoryRole;

        public AsyncServiceEmployee(
            IAsyncRepositoryRole<Role> asyncRepositoryRole,
            IAsyncRepositoryEmployee<Employee> asyncRepositoryEmployee,
            IAsyncRepositoryPosition<Position> asyncRepositoryPosition,
            IAsyncRepositoryUser<User> asyncRepositoryUser
            )
        {
            this.asyncRepositoryEmployee = asyncRepositoryEmployee;
            this.asyncRepositoryPosition = asyncRepositoryPosition;
            this.asyncRepositoryUser = asyncRepositoryUser;
            this.asyncRepositoryRole = asyncRepositoryRole;
        }

        public async Task Create(Employee item, string email, string positionName)
        {
            User user = await asyncRepositoryUser.GetByEmail(email);
            if (user == null) throw new BadRequestException("User with this email not found");
            Position position = await asyncRepositoryPosition.GetByName(positionName);
            item.StartWorkDate = DateTime.Now;
            item.UserId = user.Id;
            item.Position =
                position ?? throw new BadRequestException("Position with this name found");
            await asyncRepositoryEmployee.Add(item);

        }

        public async Task Delete(string item)
        {
            Employee employee = await asyncRepositoryEmployee.GetByEmail(item);
            if (employee == null)
                throw new BadRequestException("Position with this name not found");
            await asyncRepositoryEmployee.Delete(employee);
        }

        public async Task<IEnumerable<Employee>> Get()
        {
            return await asyncRepositoryEmployee.Get();
        }

        public async Task<Employee> GetByEmail(string email)
        {
            return await asyncRepositoryEmployee.GetByEmail(email);
        }

        public async Task Update(
            Employee item,
            string email,
            string positionName,
            string roleName
            )
        {
            Employee employee = await asyncRepositoryEmployee.GetByEmail(email);
            if (employee == null)
                throw new BadRequestException("Position with this name not found");
            if (employee.User.Role.RoleName != roleName)
            {
                employee.User.Role = await asyncRepositoryRole.GetByName(roleName);
            }
            if (employee.Position.Name != positionName)
            {
                Position position = await asyncRepositoryPosition.GetByName(positionName);
                employee.Position =
                    position ?? throw new BadRequestException("Position with this name found");
            }
            employee.Address = item.Address;
            await asyncRepositoryEmployee.Update(employee);
        }
    }
}
