function getTimeString(date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    return timeString;
}

async function checkShabbat() {
    try {
        const Ipapi_resp = await fetch('https://ipapi.co/json/');
        const clienInfo = await Ipapi_resp.json();
        const hebcal_resp = await fetch(`https://www.hebcal.com/shabbat?cfg=json&city=${clienInfo.region}&b=40&M=on`)
        const chabatInfo = await hebcal_resp.json();
        const { items } = chabatInfo;
        const chabatIn = new Date(items[0].date)
        const chabatOut = new Date(items[2].date)

        // if after chabatin and before chabatout overite body with html chabat message
        if ( Date.now() >= chabatIn.getTime() && Date.now() < chabatOut.getTime()) {
            document.querySelector("body").innerHTML = `
            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; width: 100%; height: 100vh; ">
            <img src="https://parashat.co.il/wp-content/uploads/2021/01/17.png" alt="shabat shalom">
            <p  style="margin-top:10px; font-size: 30px;" >האתר אינו פעיל בשבת נשמח לחזור לשרותכם במוצאי שבת </p>
            <p  style="margin-top:10px; font-size: 30px;" >צאת השבת : ${getTimeString(chabatOut)} </p>
            </div>
         `
        }
    } catch (error) {
        throw error;
    }

}
checkShabbat();
