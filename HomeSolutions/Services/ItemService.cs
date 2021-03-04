using System;
using System.Collections.Generic;
using HomeSolutions.Models;
using HomeSolutions.Models.Interfaces;
using MongoDB.Driver;

namespace HomeSolutions.Services
{
    public class ItemService
    {
        private readonly IMongoCollection<Item> _items;

        public ItemService(IItemDatabaseSettings dbSettings)
        {
            var client = new MongoClient(dbSettings.ConnectionString);
            var database = client.GetDatabase(dbSettings.DatabaseName);

            _items = database.GetCollection<Item>(dbSettings.ItemCollectionName);
        }

        public List<Item> Get() =>
            _items.Find(i => true).ToList();

        public Item Get(string id) =>
            _items.Find<Item>(i => i.Id == id).FirstOrDefault();

        public Item Create(Item item)
        {
            if (string.IsNullOrWhiteSpace(item.Name))
                throw new Exception("Product's name should not be empty");
            if (item.AmountTotal <= 0)
                throw new Exception("Product's amount should greater than 0");

            item.AmountLeft = item.AmountTotal;
            item.PricePerUnit = GetPricePerUnit(item);
            _items.InsertOne(item);
            return item;
        }

        public Item Update(string id, Item item) {
            if (string.IsNullOrWhiteSpace(item.Name))
                throw new Exception("Product's name should not be empty");
            if (item.AmountTotal <= 0)
                throw new Exception("Product's amount should greater than 0");

            item.PricePerUnit = GetPricePerUnit(item);
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