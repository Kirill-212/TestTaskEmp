using AutoMapper;
using BackEnd.Dto;
using BackEnd.Models;
using BackEnd.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BackEnd.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PositionController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IAsyncServicePosition<Position> asyncServicePosition;

        public PositionController(
            IMapper mapper,
            IAsyncServicePosition<Position> asyncServicePosition
            )
        {
            this.mapper = mapper;
            this.asyncServicePosition = asyncServicePosition;
        }

        [HttpPost]
        public async Task<IActionResult> Post(
            [FromBody] PostPositionDto postPositionDto
            )
        {
            if (ModelState.IsValid)
            {
                await asyncServicePosition.Create(
                    mapper.Map<Position>(postPositionDto)
                    );
            }
            else
            {
                return BadRequest(ModelState);
            }

            return Ok(postPositionDto);
        }

        [HttpGet("by/name")]
        public async Task<GetPositionDto> GetByEmail([FromQuery] string name)
        {
            return mapper.Map<GetPositionDto>(
                await asyncServicePosition.GetByName(name)
                );
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(string name)
        {
            await asyncServicePosition.Delete(name);

            return Ok(name);
        }

        [HttpGet]
        public async Task<List<GetPositionDto>> Get()
        {
            return mapper.Map<List<GetPositionDto>>(await asyncServicePosition.Get());
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] PutPositionDto putPositionDto)
        {
            if (ModelState.IsValid)
            {
                await asyncServicePosition.Update(
                    mapper.Map<Position>(putPositionDto),
                    putPositionDto.NewName
                    );
            }
            else
            {
                return BadRequest(ModelState);
            }

            return Ok(putPositionDto);
        }
    }
}
