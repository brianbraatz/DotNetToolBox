using ReportApp.Shared.Models;

namespace ReportApp.Server.Services;

public interface IReportDataService
{
    Task<List<Report>> GetReports();
}
