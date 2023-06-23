namespace InternetShopBackend.Data.Entities
{
    public class AppFilterProduct
    {
        public int ProductId { get; set; }
        public int FilterId { get; set; }

        public virtual AppFilter Filter { get; set; }
        public virtual AppProduct Product { get; set; }
    }
}
