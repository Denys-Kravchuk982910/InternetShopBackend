namespace InternetShopBackend.Data.Entities
{
    public class AppOrderProduct
    {
        public int Id { get; set; }
        public int Size { get; set; }
        public int ProductId { get; set; }
        public AppProduct Product { get; set; }

        public int OrderId { get; set; }
        public AppOrder Order { get; set; }

        public int FilterId { get; set; }
        public AppFilter Filter { get; set; }


    }
}
