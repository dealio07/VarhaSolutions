using System;
using HomeSolutions.Models.Interfaces;
using HomeSolutions.Providers.Abstraction;
using MongoDB.Driver;

namespace HomeSolutions.Providers.Implementation
{
    public class MongoDbClientProvider: IMongoDbClientProvider
    {
        private readonly string _connectionString;
        private readonly string _dbName;
        private MongoClient _client;

        public MongoDbClientProvider(IDatabaseSettings dbSettings)
        {
            _connectionString = dbSettings.ConnectionString;
            _dbName = dbSettings.DatabaseName;
        }

        public IMongoCollection<T> GetCollection<T>(string collectionName)
        {
            return GetDatabase().GetCollection<T>(collectionName);
        }

        private IMongoDatabase GetDatabase()
        {
            if (string.IsNullOrEmpty(_dbName))
                throw new ArgumentNullException(nameof(_dbName));

            if (string.IsNullOrEmpty(_connectionString))
                throw new ArgumentNullException(nameof(_connectionString));

            _client ??= new MongoClient(_connectionString);

            if (_client.ListDatabaseNames().ToList().Exists(n => n == _dbName))
                return _client.GetDatabase(_dbName);

            throw new Exception($"Database {_dbName} does not exist");
        }
    }
}