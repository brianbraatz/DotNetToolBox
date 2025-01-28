using Microsoft.AspNetCore.SignalR;
using ReportApp.Server.Hubs;
using ReportApp.Server.Services;

namespace ReportApp.Server.Workers;

public class TimeWorker : BackgroundService
{
    private readonly IHubContext<ReportHub> _reportHub;
    private readonly IServiceProvider _serviceProvider;

    public TimeWorker(
        IHubContext<ReportHub> reportHub,
        IServiceProvider serviceProvider)
    {
        _reportHub = reportHub;
        _serviceProvider = serviceProvider;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            using var scope = _serviceProvider.CreateScope();
            var reportDataService = scope.ServiceProvider.GetRequiredService<IReportDataService>();

            var reportData = await reportDataService.GetReports();
            var methodName = "TransferReportData";

            await _reportHub.Clients.All.SendAsync(
                methodName,
                reportData,
                stoppingToken);

            await Task.Delay(
                TimeSpan.FromSeconds(1),
                stoppingToken);
        }
    }
}
