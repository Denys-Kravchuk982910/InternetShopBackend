namespace InternetShopBackend.Data.Entities
{
    public class AppFilter
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int? ParentId { get; set; }
        public virtual AppFilter Parent { get; set; }
        public virtual ICollection<AppFilter> Children { get; set; }
        public virtual ICollection<AppFilterProduct> FilterProducts { get; set; }
        public virtual ICollection<AppOrderProduct> OrderProducts { get; set; }

    }
}
