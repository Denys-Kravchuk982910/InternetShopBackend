using System.Drawing;

namespace InternetShopBackend.Services
{
    public static class ImageWorker
    {
        public static Bitmap ConvertToImage(string image)
        {
            byte[] bytes = Convert.FromBase64String(image);

            using (MemoryStream ms = new MemoryStream(bytes))
            {
                ms.Position = 0;
                Image img = Image.FromStream(ms);

                ms.Close();
                bytes = null;
                return new Bitmap(img);
            }
        }
    }
}
