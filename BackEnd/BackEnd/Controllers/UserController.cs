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
    public class UserController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IAsyncServiceUser<User> asyncServiceUser;

        public UserController(
            IMapper mapper,
            IAsyncServiceUser<User> asyncServiceUser
            )
        {
            this.mapper = mapper;
            this.asyncServiceUser = asyncServiceUser;
        }

        [HttpPost]
        public async Task<IActionResult> Post(
            [FromBody] PostUserDto postUserDto
            )
        {
            if (ModelState.IsValid)
            {
                await asyncServiceUser.Create(mapper.Map<User>(postUserDto));
            }
            else
            {
                return BadRequest(ModelState);
            }

            return Ok(postUserDto);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(string email)
        {
            await asyncServiceUser.Delete(email);

            return Ok(email);
        }

        [HttpGet]
        public async Task<List<GetUserDto>> Get()
        {
            return mapper.Map<List<GetUserDto>>(await asyncServiceUser.Get());
        }


        [HttpGet("not/added/emp")]
        public async Task<List<GetUserDto>> GetUsersNotAddedToEmp()
        {
            return mapper.Map<List<GetUserDto>>(
                await asyncServiceUser.GetUsersNotAddedToEmp()
                );
        }

        [HttpGet("by/email")]
        public async Task<GetUserDto> GetByEmail([FromQuery] string email)
        {
            return mapper.Map<GetUserDto>(await asyncServiceUser.GetByEmail(email));
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] PutUserDto putUserDto)
        {
            if (ModelState.IsValid)
            {
                await asyncServiceUser.Update(
                    mapper.Map<User>(putUserDto), putUserDto.RoleName
                    );
            }
            else
            {
                return BadRequest(ModelState);
            }

            return Ok(putUserDto);
        }
    }
}
