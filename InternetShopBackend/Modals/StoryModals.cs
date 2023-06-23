namespace InternetShopBackend.Modals
{
    public class AddStoryModal
    {
        public int StoryId { get; set; }
        public string Image { get; set; }
    }
    
    public class DeleteStoryModal
    {
        public int Id { get; set; }
    }

    public class StoryModal
    {
        public int Id { get; set; }
        public string Image { get; set; }
        public int StoryId { get; set; }
    }
}
