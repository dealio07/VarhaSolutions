namespace HomeSolutions.Models.Interfaces
{
    public interface IItemDatabaseSettings
    {
        string ItemCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}