namespace InternetShopBackend.Data.Entities
{
    public class AppProductImage
    {
        public int Id { get; set; }
        public string Image { get; set; }
        public int ProductId { get; set; }
        public virtual AppProduct Product { get; set; }
    }
}
