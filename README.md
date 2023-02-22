# Shabbat kodesh Script
This is a JavaScript script that can be used to ensure that a website observes Shabbat, a Jewish day of rest, according to Jewish tradition. The script fetches the user's location data using the IPAPI service, and then retrieves the relevant Shabbat times from the Hebcal API. The script then compares the start and end times of Shabbat to the current time to determine whether it is currently Shabbat.

If it is Shabbat, the script displays a message in Hebrew to inform the user that the website is inaccessible during this time. The message includes a Jewish proverb: 'כִּי אֶשְׁמְרָה שַׁבָּת אֵל יִשְׁמְרֵנִי אוֹת הִיא לְעוֹלְמֵי עַד בֵּינוֹ וּבֵינִי'

# Usage
To use the script, simply include it in the <head> section of your website:

```html
<head>
    <script src="shabbat-observance.js"></script>
</head>
```
The script will automatically run every minute to check whether it is currently Shabbat. If it is, the message will be displayed, and the user will be unable to access the website until Shabbat has ended.

# Dependencies
This script relies on external APIs to retrieve location and Shabbat information. Specifically, it uses the following APIs:

IPAPI (https://ipapi.co) to retrieve the user's location data
Hebcal (https://www.hebcal.com) to retrieve the relevant Shabbat times
# Contributing
If you have suggestions for how to improve this script, please open an issue or submit a pull request. Contributions of all kinds are welcome and appreciated!
