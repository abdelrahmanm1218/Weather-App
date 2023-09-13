let loc = document.getElementById("location");
let cond = document.getElementById("condition");
let wind  = document.getElementById("wind");
let img = document.getElementById("img-icon");
let percip = document.getElementById("percip");
let temp = document.getElementById("temp");
let nextDays = document.getElementById("next-days");
let dayOne = document.getElementById("day-one");
let dayOneTemp = document.getElementById("day-one-temp");
let dayOneIcon = document.getElementById("day-one-icon");
let dayTwo = document.getElementById("day-two");
let dayTwoTemp = document.getElementById("day-two-temp");
let dayTwoIcon = document.getElementById("day-two-icon");
let dayThree = document.getElementById("day-three");
let dayThreeTemp = document.getElementById("day-three-temp");
let dayThreeIcon = document.getElementById("day-three-icon");

let days = ["SAT","SUN", "MON","TUE","WED","THU","FRI"];

function getLocation(country, city){
    loc.appendChild(document.createTextNode(`${country}, ${city}`));
}
function getCondition(condition){
    cond.appendChild(document.createTextNode(`${condition["day"]["condition"]["text"]}`));
    wind.appendChild(document.createTextNode(`Humidity ${condition["day"]["avghumidity"]} % `));
    img.setAttribute("src",condition["day"]["condition"]["icon"]);
    percip.appendChild(document.createTextNode(`perciption: ${condition["day"]["totalprecip_mm"]} %`))
}
function getTemp(temperature) {
    // temp.append(document.createTextNode(`${temperature} C.`))
    // console.log(temperature["day"]["avgtemp_c"]);
    temp.append(document.createTextNode(`${temperature["day"]["avgtemp_c"]} C.`))
}
function getDayOne (dayObj){
    //get next day 
    console.log(dayObj["day"]["condition"]["icon"]);
    let date = new Date(dayObj["date"]);
    let index = date.getDay();
    let day = days[index];
    dayOne.appendChild(document.createTextNode(day));
    // get temp next day
    dayOneTemp.appendChild(document.createTextNode(`${dayObj["day"]["avgtemp_c"]}`))
    dayOneIcon.setAttribute("src",dayObj["day"]["condition"]["icon"]);


}
function getDayTwo(dayObj2){
    // get day+2
    let date = new Date(dayObj2["date"]);
    let index = date.getDay();
    let day = days[index];
    dayTwo.appendChild(document.createTextNode(`${day}`));
    // console.log(date.getDay());
    // get temp of day+2
    dayTwoTemp.appendChild(document.createTextNode(`${dayObj2["day"]["avgtemp_c"]}`))
    //console.log(date.getDay(dayObj2["date"]));
    dayTwoIcon.setAttribute("src",dayObj2["day"]["condition"]["icon"] )
}
function getDayThree(dayObj){
    //get day+3
    let date = new Date(dayObj["date"]);
    let index = date.getDay();
    let day = days[index];
    dayThree.appendChild(document.createTextNode(`${day}`));
    // get day+3 temp
    dayThreeTemp.appendChild(document.createTextNode(`${dayObj["day"]["avgtemp_c"]}`));
    dayThreeIcon.setAttribute("src",dayObj["day"]["condition"]["icon"]);

}
function passObj(weatherObject){
    console.log(weatherObject);
    getLocation(weatherObject["location"]["country"],weatherObject["location"]["name"]);
    // getCondition(weatherObject["current"]["condition"]["text"], weatherObject["current"]["condition"]["icon"], weatherObject["current"]["wind_kph"],  weatherObject["current"]["wind_dir"], weatherObject["current"]["precip_in"]);
    getCondition(weatherObject["forecast"]["forecastday"][0]);
    // getTemp(weatherObject["current"]["temp_c"]);
    getTemp(weatherObject["forecast"]["forecastday"][0]);
    getDayOne(weatherObject["forecast"]["forecastday"][1]);
    getDayTwo(weatherObject["forecast"]["forecastday"][2]);
    getDayThree(weatherObject["forecast"]["forecastday"][3]);
}

async function fetchData() {
    try{
        let myData = await fetch("http://api.weatherapi.com/v1/forecast.json?key=24594d3c5f934d7d929142449231209&q=cairo&days=4&aqi=no&alerts=no");
        let obj = await myData.json();
        passObj(obj);
    }catch(reason){
        console.error(`Error: ${reason}`);
    }finally {
        console.log("after fetch");
    }
}

fetchData();

