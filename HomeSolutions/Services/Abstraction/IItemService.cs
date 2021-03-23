using System.Collections.Generic;
using HomeSolutions.Models;

namespace HomeSolutions.Services.Abstraction
{
    public interface IItemService
    {
        public List<Item> Get();

        public Item Get(string id);

        public Item Create(Item item);

        public Item Update(string id, Item item);

        public void Remove(Item item);

        public void Remove(string id);
    }
}