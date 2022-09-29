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
    public class RoleController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IAsyncServiceRole<Role> asyncServiceRole;

        public RoleController(
            IMapper mapper,
            IAsyncServiceRole<Role> asyncServiceRole
            )
        {
            this.mapper = mapper;
            this.asyncServiceRole = asyncServiceRole;
        }

        [HttpPost]
        public async Task<IActionResult> Post(
            [FromBody] PostRoleDto postRoleDto
            )
        {
            if (ModelState.IsValid)
            {
                await asyncServiceRole.Create(mapper.Map<Role>(postRoleDto));
            }
            else
            {
                return BadRequest(ModelState);
            }

            return Ok(postRoleDto);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(string name)
        {
            await asyncServiceRole.Delete(name);

            return Ok(name);
        }

        [HttpGet]
        public async Task<List<GetRoleDto>> Get()
        {
            return mapper.Map<List<GetRoleDto>>(await asyncServiceRole.Get());
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] PutRoleDto putRoleDto)
        {
            if (ModelState.IsValid)
            {
                await asyncServiceRole.Update(
                    putRoleDto.RoleName,
                    putRoleDto.NewRoleName
                    );
            }
            else
            {
                return BadRequest(ModelState);
            }

            return Ok(putRoleDto);
        }
    }
}
