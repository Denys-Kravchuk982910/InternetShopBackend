namespace InternetShopBackend.Modals
{
    public class AddStoryModal
    {
        public string Image { get; set; }
        public string Title { get; set; }
    }
    
    public class DeleteStoryModal
    {
        public int Id { get; set; }
    }

    public class StoryModal
    {
        public int Id { get; set; }
        public string Image { get; set; }
    }


    public class GetStoryModal
    {
        public string Title { get; set; }
        public List<GetStoryImage> Images { get; set; }
    }

    public class GetStoryImage
    {
        public string Image { get; set; }
    }
}
