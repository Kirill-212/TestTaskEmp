using System.Data;
using System.Threading.Tasks;

namespace BackEnd.SupportExcel
{
    public interface IGenerateExcelFile
    {
        Task<DataTable> Generate();
    }
}
