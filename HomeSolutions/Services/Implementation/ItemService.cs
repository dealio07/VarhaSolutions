using System;
using System.Collections.Generic;
using System.Globalization;
using HomeSolutions.Models;
using HomeSolutions.Providers.Abstraction;
using HomeSolutions.Services.Abstraction;
using MongoDB.Driver;

namespace HomeSolutions.Services.Implementation
{
    public class ItemService: IItemService
    {
        private readonly IMongoCollection<Item> _items;

        public ItemService(IMongoDbClientProvider mongoDbClientProvider)
        {
            _items = mongoDbClientProvider.GetCollection<Item>("Items");
        }

        public List<Item> Get() =>
            _items.Find(i => true).SortByDescending(i => i.Created).ToList();

        public Item Get(string id) =>
            _items.Find(i => i.Id == id).FirstOrDefault();

        public Item Create(Item item)
        {
            if (string.IsNullOrWhiteSpace(item.Name))
                throw new Exception("Item's name should not be empty");
            if (item.AmountTotal <= 0)
                throw new Exception("Item's amount should be greater than 0");

            item.AmountLeft = item.AmountTotal;
            item.PricePerUnit = GetPricePerUnit(item);
            item.Created = DateTime.Now;
            item.Updated = DateTime.Now;
            _items.InsertOne(item);
            return item;
        }

        public Item Update(string id, Item item) {
            if (string.IsNullOrWhiteSpace(item.Name))
                throw new Exception("Item's name should not be empty");
            if (item.AmountTotal <= 0)
                throw new Exception("Item's amount should be greater than 0");
            if (item.AmountLeft > item.AmountTotal)
                throw new Exception("Item's amount left should be greater than total amount");
            if (item.AmountLeft < 0)
                throw new Exception("Item's amount left couldn't be less than 0");

            item.PricePerUnit = GetPricePerUnit(item);
            item.Updated = DateTime.Now;
            _items.ReplaceOne(i => i.Id == id, item);
            return item;
        }

        public void Remove(Item item) =>
            _items.DeleteOne(i => i.Id == item.Id);

        public void Remove(string id) =>
            _items.DeleteOne(i => i.Id == id);

        private decimal? GetPricePerUnit(Item item)
        {
            if (!item.Price.HasValue || item.AmountTotal == 0)
                return null;

            return item.Price / item.AmountTotal;
        }
    }
}