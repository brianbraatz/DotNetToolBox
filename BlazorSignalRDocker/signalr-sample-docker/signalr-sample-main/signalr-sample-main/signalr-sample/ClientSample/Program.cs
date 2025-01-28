using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading;
using Microsoft.AspNetCore.SignalR.Client;
using Newtonsoft.Json;

namespace ClientSample
{
    class Program
    {
        private static readonly AutoResetEvent AutoEvent = new(false);
        private static readonly HttpClient Client = new ();

        private const string HubBaseUrl = "http://localhost";

        static void Main()
        {
            var connection = new HubConnectionBuilder()
                .WithUrl($"{HubBaseUrl}/itemsHub")
                .Build();

            connection.On("UpdateList", GetItems);
            
            connection.StartAsync().GetAwaiter().GetResult();

            Console.WriteLine("Listening on itemsHub, press ENTER to exit.");

            AutoEvent.WaitOne();
        }

        private static void GetItems()
        {
            var response = Client.GetAsync($"{HubBaseUrl}/Items").GetAwaiter().GetResult();
            var list = DeserializeResponse<List<string>>(response);

            Console.WriteLine("Updated list: ");
            list.ForEach(i => Console.WriteLine($"- {i}"));
            Console.WriteLine();
        }
        
        private static T DeserializeResponse<T>(HttpResponseMessage response)
        {
            var responseAsString = response.Content.ReadAsStringAsync().GetAwaiter().GetResult();
            return JsonConvert.DeserializeObject<T>(responseAsString);
        }
    }
}