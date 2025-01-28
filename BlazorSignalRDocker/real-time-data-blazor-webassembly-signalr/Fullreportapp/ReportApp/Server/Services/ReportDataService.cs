using ReportApp.Shared.Models;

namespace ReportApp.Server.Services;

public class ReportDataService : IReportDataService
{
    public Task<List<Report>> GetReports()
    {
        var mockedData = GetMockedReports();
        return Task.FromResult(mockedData);
    }

    private List<Report> GetMockedReports()
    {
        var r = new Random();
        var mockedReports = new List<Report>();

        for (int i = 0; i < 20; i++)
        {
            mockedReports.Add(new Report
            {
                Date = DateTime.Now,
                DataCount = r.Next(0, 100)
            });
        }

        return mockedReports;
    }
}
