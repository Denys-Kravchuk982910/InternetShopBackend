namespace InternetShopBackend.Modals
{
    public class AddFeedback
    {
        public string Image { get; set; }
        public string Message { get; set; }
        public string Name { get; set; }
        public DateTime Time { get; set; }
    }

    public class DeleteFeedback
    {
        public int Id { get; set; }
    }

    public class Feedback
    {
        public string Image { get; set; }
        public string Message { get; set; }
        public string Name { get; set; }
        public DateTime Time { get; set; }
    }
}
