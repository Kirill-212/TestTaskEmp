using BackEnd.Exceptions;
using BackEnd.Models;
using BackEnd.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BackEnd.Services
{
    public class AsyncServicePosition : IAsyncServicePosition<Position>
    {
        private readonly IAsyncRepositoryPosition<Position> asyncRepositoryPosition;

        public AsyncServicePosition(
            IAsyncRepositoryPosition<Position> asyncRepositoryPosition
            )
        {
            this.asyncRepositoryPosition = asyncRepositoryPosition;
        }
        public async Task Create(Position item)
        {
            Position position = await asyncRepositoryPosition.GetByName(item.Name);
            if (position != null)
                throw new BadRequestException("Position with this name found");
            await asyncRepositoryPosition.Add(item);
        }

        public async Task Delete(string name)
        {
            Position position = await asyncRepositoryPosition.GetByName(name);
            if (position == null)
                throw new BadRequestException("Position with this name not found");
            await asyncRepositoryPosition.Delete(position);
        }

        public async Task<IEnumerable<Position>> Get()
        {
            return await asyncRepositoryPosition.Get();
        }

        public async Task<Position> GetByName(string name)
        {
            return await asyncRepositoryPosition.GetByName(name);
        }

        public async Task Update(Position item, string newName)
        {
            Position position = await asyncRepositoryPosition.GetByName(item.Name);
            if (position == null)
                throw new BadRequestException("Position with this name not found");
            if (newName != null)
            {
                if (await asyncRepositoryPosition.GetByName(newName) != null)
                    throw new BadRequestException("Position with this namefound");
                position.Name = newName;
            }
            position.Description = item.Description;
            await asyncRepositoryPosition.Update(position);
        }
    }
}
