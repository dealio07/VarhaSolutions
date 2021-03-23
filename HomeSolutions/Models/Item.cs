using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace HomeSolutions.Models
{
    public class Item
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
         public string Id { get; set; }

         [BsonRepresentation(BsonType.String)]
         public string Name { get; set; }

         [BsonRepresentation(BsonType.String)]
         public ItemTypeEnum Type { get; set; }

         [BsonRepresentation(BsonType.String)]
         public ItemUserTypeEnum UserType { get; set; }

         [BsonRepresentation(BsonType.Decimal128)]
         public decimal? AmountTotal { get; set; }

         [BsonRepresentation(BsonType.Decimal128)]
         public decimal? AmountLeft { get; set; }

         [BsonRepresentation(BsonType.Decimal128)]
         public decimal? Price { get; set; }

         [BsonRepresentation(BsonType.Decimal128)]
         public decimal? PricePerUnit { get; set; }

         [BsonRepresentation(BsonType.DateTime)]
         public DateTime? Created { get; set; }

         [BsonRepresentation(BsonType.DateTime)]
         public DateTime? Updated { get; set; }
    }
}