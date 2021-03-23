using HomeSolutions.Models.Interfaces;

namespace HomeSolutions.Models
{
    public class DatabaseSettings: IDatabaseSettings
    {
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
}