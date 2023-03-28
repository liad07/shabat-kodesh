# Shabbat kodesh Script

This is a JavaScript and C# script that can be used to ensure that a website observes Shabbat, a Jewish day of rest, according to Jewish tradition. The scripts fetch the user's location data using the IPAPI service, and then retrieve the relevant Shabbat times from the Hebcal API. The scripts then compare the start and end times of Shabbat to the current time to determine whether it is currently Shabbat.

# JavaScript Version
## Usage

To use the script, simply include it in the <head> section of your website:

```html
<head>
  <script src="https://liad07.github.io/shabat-kodesh/main.js"></script>
</head>
```

The script will automatically run every minute to check whether it is currently Shabbat. If it is, a message will be displayed in Hebrew to inform the user that the website is inaccessible during this time. The message includes a Jewish proverb: 'כִּי אֶשְׁמְרָה שַׁבָּת אֵל יִשְׁמְרֵנִי אוֹת הִיא לְעוֹלְמֵי עַד בֵּינוֹ וּבֵינִי'.

## Dependencies

This script relies on external APIs to retrieve location and Shabbat information. Specifically, it uses the following APIs:

- IPAPI (https://ipapi.co) to retrieve the user's location data
- Hebcal (https://www.hebcal.com) to retrieve the relevant Shabbat times
## Contributing

If you have suggestions for how to improve this script, please open an issue or submit a pull request. Contributions of all kinds are welcome and appreciated!

# C# Version
## Usage
The api class now in file on thie git called api.cs pls include in same directory
  
To use the script, simply include it in your C# ASP.NET project:
```csharp
        protected async void Page_Load(object sender, EventArgs e)
        {
            if((int)DateTime.Now.DayOfWeek == 5 || (int)DateTime.Now.DayOfWeek == 6)
            {
                api api = new api();
                string content = await api.GetContent("http://ip-api.com/json/");
                JObject responseObj = JObject.Parse(content);
                string city = (string)responseObj["city"];
                string hebcal = await api.GetContent("https://www.hebcal.com/shabbat?cfg=json&city=" + city + "&b=40&M=on");
                JObject hebcal2 = JObject.Parse(hebcal);

                JArray items = (JArray)hebcal2["items"];
                var chabatIn = DateTime.Parse(hebcal2["items"][0]["date"].ToString());
                var chabatOut = DateTime.Parse(hebcal2["items"][items.Count() - 1]["date"].ToString());

                if (DateTime.Now >= chabatIn && DateTime.Now < chabatOut && (int)DateTime.Now.DayOfWeek == 5 || (int)DateTime.Now.DayOfWeek == 6)
                {
                    Response.Clear();
                    Response.StatusCode = 702;
                    Response.StatusDescription = "שבת היום";
                    Response.Write("<div style=\"display: flex; flex-direction: column; justify-content: center; align-items: center; width: 100%; height: 100vh; background-color: #f2f2f2;\">\n" +
                                   "  <img src=\"https://parashat.co.il/wp-content/uploads/2021/01/17.png\" alt=\"shabat shalom\" style=\"width: 50%; height: auto;\">\n" +
                                   "  <p style=\"margin-top: 10px; font-size: 30px; text-align: center; color: #4d4d4d;\">האתר אינו פעיל בשבת, נשמח לחזור לשרותכם במוצאי שבת</p>\n" +
                                   "  <p style=\"margin-top: 10px; font-size: 30px; text-align: center; color: #4d4d4d;\">צאת השבת: " + chabatOut + "</p>\n" +
                                   "</div>");

                    Response.End();

                    HttpContext.Current.ApplicationInstance.CompleteRequest();
                }
            }
            
        }
```
## Dependencies
This script relies on external APIs to retrieve location and Shabbat information. Specifically, it uses the following APIs:

- IPAPI (https://ip-api.co) to retrieve the user's location data
- Hebcal (https://www.hebcal.com) to retrieve the relevant Shabbat times
## Contributing
If you have suggestions for how to improve this script, please open an issue or submit a pull request. Contributions of all kinds are welcome and appreciated!
