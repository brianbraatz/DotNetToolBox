using System.Collections.Generic;
using System.Threading.Tasks;
using HubSample.Hubs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace HubSample.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ItemsController : ControllerBase
    {
        private readonly IHubContext<ItemsHub> _itemsHub;
        private readonly List<string> _items;

        public ItemsController(IHubContext<ItemsHub> itemsHub, List<string> items)
        {
            _itemsHub = itemsHub;
            _items = items;
        }
        
        /// <summary>
        /// Gets all items
        /// </summary>
        [HttpGet]
        public IActionResult GetItems()
        {
            return Ok(_items);
        }
        
        /// <summary>
        /// Adds a new item to the list
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        /// "Shampoo"
        ///
        /// </remarks>
        [HttpPost]
        public async Task<IActionResult> AddItem([FromBody] string item)
        {
            _items.Add(item);

            await _itemsHub.Clients.All.SendAsync("UpdateList");

            return Ok(_items);
        }
    }
}