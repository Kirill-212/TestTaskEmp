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
    public class EmployeeController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IAsyncServiceEmployee<Employee> asyncServiceEmployee;

        public EmployeeController(
            IMapper mapper,
            IAsyncServiceEmployee<Employee> asyncServiceEmployee
            )
        {
            this.mapper = mapper;
            this.asyncServiceEmployee = asyncServiceEmployee;
        }

        [HttpPost]
        public async Task<IActionResult> Post(
            [FromBody] PostEmployeeDto postEmployeeDto
            )
        {
            if (ModelState.IsValid)
            {
                await asyncServiceEmployee.Create(
                    mapper.Map<Employee>(postEmployeeDto),
                    postEmployeeDto.Email,
                    postEmployeeDto.PositionName
                    );
            }
            else
            {
                return BadRequest(ModelState);
            }

            return Ok(postEmployeeDto);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(string email)
        {
            await asyncServiceEmployee.Delete(email);

            return Ok(email);
        }

        [HttpGet]
        public async Task<List<GetEmployeeDto>> Get()
        {

            return mapper.Map<List<GetEmployeeDto>>(
                await asyncServiceEmployee.Get()
                );
        }

        [HttpGet("by/email")]
        public async Task<GetEmployeeDto> GetByEmail([FromQuery] string email)
        {
            return mapper.Map<GetEmployeeDto>(
                await asyncServiceEmployee.GetByEmail(email)
                );
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] PutEmployeeDto putEmployeeDto)
        {
            if (ModelState.IsValid)
            {
                await asyncServiceEmployee.Update(
                    mapper.Map<Employee>(putEmployeeDto),
                    putEmployeeDto.Email,
                    putEmployeeDto.PositionName,
                    putEmployeeDto.RoleName
                    );
            }
            else
            {
                return BadRequest(ModelState);
            }

            return Ok(putEmployeeDto);
        }
    }
}
