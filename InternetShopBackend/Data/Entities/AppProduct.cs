namespace InternetShopBackend.Data.Entities
{
    public class AppProduct
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public int Count { get; set; }
        public int Rating { get; set; }
        public string Brand { get; set; }

        public virtual ICollection<AppProductImage> ProductImages { get; set; }
        public virtual ICollection<AppFilterProduct> FilterProducts { get; set; }
        public virtual ICollection<AppOrderProduct> OrderProducts { get; set; }
    }
}
