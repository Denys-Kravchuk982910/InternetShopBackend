namespace InternetShopBackend.Modals
{
    public class PushOrder
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string ParentName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Post { get; set; }

        public string Targets { get; set; }
    }

    public class ProductTarget
    {
        public int id { get; set; }
        public string size { get; set; }
    }


    public class OrderAcceptance
    {
        public bool Accept { get; set; }
        public int Id { get; set; }
    }
}
