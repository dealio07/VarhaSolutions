using System.Collections.Generic;
using HomeSolutions.Models;
using HomeSolutions.Services;
using Microsoft.AspNetCore.Mvc;

namespace HomeSolutions.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ItemsController : ControllerBase
    {
        private readonly ItemService _itemService;

        public ItemsController(ItemService itemService)
        {
            _itemService = itemService;
        }

        [HttpGet]
        public ActionResult<List<Item>> GetProducts()
        {
            return Ok(_itemService.Get());
        }
        
        [HttpGet("{id:length(24)}")]
        public ActionResult<Item> Get(string id)
        {
            var item = _itemService.Get(id);

            if (item == null)
                return NotFound();

            return Ok(item);
        }
        
        [HttpPost]
        public ActionResult<Item> Create(Item item)
        {
            return Ok(_itemService.Create(item));
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Item itemIn)
        {
            var item = _itemService.Get(id);

            if (item == null)
            {
                return NotFound();
            }

            return Ok(_itemService.Update(id, itemIn));
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var item = _itemService.Get(id);

            if (item == null)
            {
                return NotFound();
            }

            _itemService.Remove(item.Id);

            return Ok();
        }
    }
}