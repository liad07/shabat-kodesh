async function checkShabbat() {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();

    fetch('https://www.hebcal.com/shabbat?cfg=i2&city=' + data.city + '&b=18&M=on&lg=he-x-NoNikud&tgt=_top')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const firstStrong = doc.querySelectorAll('strong');

            let cnisahour = firstStrong[0].textContent.split(":")[0];
            const cnisaminute = firstStrong[0].textContent.split(":")[1];

            const outhour = firstStrong[1].textContent.split(":")[0];
            const outminute = firstStrong[1].textContent.split(":")[1];

            const now = new Date();
            let currentHour = now.getHours();
            const currentMinute = now.getMinutes();
            const day = now.getDay();

            if (currentHour < cnisahour || (currentHour === cnisahour && cnisaminute < currentMinute && day === 5)) {
                // Shabbat has not started yet
            } else {
                if (currentHour > outhour || (currentHour === outhour && currentMinute >= outminute && day === 6)) {
                    // Shabbat has ended
                } else {
                    // Shabbat is currently in progress
                    const message = "יהודי יקר,\n\nהאתר בו הנך מבקר שומר שבת וחג, ולכן הגלישה בו אינה מתאפשרת בזמן זה.\n\n'כִּי אֶשְׁמְרָה שַׁבָּת אֵל יִשְׁמְרֵנִי אוֹת הִיא לְעוֹלְמֵי עַד בֵּינוֹ וּבֵינִי'  \n";
                    const centerTag = "<center><b>" + message + "</b></center>";
                    document.write(centerTag);
                }
            }
        });
}

setInterval(checkShabbat, 60000); // run every minute
