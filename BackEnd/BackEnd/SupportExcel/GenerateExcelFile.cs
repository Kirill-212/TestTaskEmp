using AutoMapper;
using BackEnd.Dto;
using BackEnd.Models;
using BackEnd.Repositories;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace BackEnd.SupportExcel
{
    public class GenerateExcelFile : IGenerateExcelFile
    {
        private readonly IAsyncRepositoryEmployee<Employee> asyncRepository;
        private readonly IMapper mapper;
        public GenerateExcelFile(
            IAsyncRepositoryEmployee<Employee> asyncRepository,
            IMapper mapper
            )
        {
            this.mapper = mapper;
            this.asyncRepository = asyncRepository;
        }

        public async Task<DataTable> Generate()
        {
            List<GetEmployeeDto> employees =
                mapper.Map<List<GetEmployeeDto>>(
                    await asyncRepository.Get()
                    );
            var dataTable = new DataTable("Employees");
            dataTable.Columns.Add("Email", typeof(string));
            dataTable.Columns.Add("Address", typeof(string));
            dataTable.Columns.Add("Position name", typeof(string));
            dataTable.Columns.Add("Role name", typeof(string));
            dataTable.Columns.Add("Start Work date", typeof(string));

            foreach (var employee in employees)
            {
                var row = dataTable.NewRow();
                row["Email"] = employee.Email;
                row["Address"] = employee.Address;
                row["Position name"] = employee.PositionName;
                row["Role name"] = employee.RoleName;
                row["Start Work date"] = employee.StartWorkDate.ToString();
                dataTable.Rows.Add(row);
            }

            return dataTable;
        }
    }
}
