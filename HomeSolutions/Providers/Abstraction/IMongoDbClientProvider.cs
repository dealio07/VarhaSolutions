using MongoDB.Driver;

namespace HomeSolutions.Providers.Abstraction
{
    public interface IMongoDbClientProvider
    {
        public IMongoCollection<T> GetCollection<T>(string collectionName);
    }
}