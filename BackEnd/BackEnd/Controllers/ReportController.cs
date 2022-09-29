using BackEnd.SupportExcel;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using System.Threading.Tasks;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private const string XlsxContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        private readonly IGenerateExcelFile generateExcel;
        public ReportController(IGenerateExcelFile generateExcel)
        {
            this.generateExcel = generateExcel;
        }

        [HttpGet]
        public async Task<IActionResult> DataTableReport()
        {
            var dataTable = await generateExcel.Generate();

            using var package = new ExcelPackage();
            var worksheet = package.Workbook.Worksheets.Add("Excel Test");
            worksheet.Cells["A1"].LoadFromDataTable(dataTable, PrintHeaders: true);
            for (var col = 1; col < dataTable.Columns.Count + 1; col++)
            {
                worksheet.Column(col).AutoFit();
            }
            return File(package.GetAsByteArray(), XlsxContentType, "report.xlsx");
        }
    }
}
