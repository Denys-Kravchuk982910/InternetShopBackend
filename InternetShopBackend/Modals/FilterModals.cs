namespace InternetShopBackend.Modals
{
    public class AddFilter
    {
        public string Title { get; set; }
        public int? ParentId { get; set; }
    }

    public class DeleteFilter
    {
        public int Id { get; set; }
    }

    public class Filter
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int? ParentId { get; set; }
    }
}
