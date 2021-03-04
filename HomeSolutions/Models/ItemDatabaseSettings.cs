using HomeSolutions.Models.Interfaces;

namespace HomeSolutions.Models
{
    public class ItemDatabaseSettings: IItemDatabaseSettings
    {
        public string ItemCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
}