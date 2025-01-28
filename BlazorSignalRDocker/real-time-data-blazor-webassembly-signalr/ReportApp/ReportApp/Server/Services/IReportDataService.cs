
namespace ReportApp.Server.Services
{
    public interface IReportDataService
    {
        Task<object?> GetReports();
    }
}