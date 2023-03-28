using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net.Http;
using System.Threading.Tasks;
namespace shabatkodesh
{
    public class api
    {
        public api()
        {

        }

        public async Task<string>  GetContent(string url)
    {
            var client = new HttpClient();
        var response = await client.GetAsync(url) ;
        var content = await response.Content.ReadAsStringAsync();
            // Process the response content
         return content;
    }
}
}
