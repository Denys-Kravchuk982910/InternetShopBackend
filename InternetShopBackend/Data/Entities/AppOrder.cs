namespace InternetShopBackend.Data.Entities
{
    public class AppOrder
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string ParentName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Post { get; set; }
    }
}
