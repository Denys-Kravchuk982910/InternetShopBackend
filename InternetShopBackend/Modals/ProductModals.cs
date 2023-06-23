namespace InternetShopBackend.Modals
{
    public class AddProduct
    {
        public string Title { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public int Count { get; set; }
    }

    public class EditProduct
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public int Count { get; set; }
    }

    public class DeleteProduct
    {
        public int Id { get; set; }
    }

    public class ProductModal
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public int Count { get; set; }
    }

    public class ProductImage
    {
        public string ImageBase64 { get; set; }
        public int ProductId { get; set; }
    }

    public class ProductFilter
    {
        public int FilterId { get; set; }
        public int ProductId { get; set; }
    }

    public class DelProductImage
    {
        public int Id { get; set; }
    }

    public class GetProduct
    {
        public int Id { get; set; }
    }
}
