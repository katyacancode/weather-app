const api = {
    endpoint: "https://api.openweathermap.org/data/2.5/",
    key: "d0b9fda68b200a9a9d6d3f5c4645024f"
}

const MY_KEY = "d44ca671ae5f4fd19e2f6c5a77388415";

const input = document.querySelector("#input");
input.addEventListener("keypress", enter);

async function getIP() {
    const res = await fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=${MY_KEY}`);
    const result = await res.json();
    getInfo(result.city);
}

getIP();

function enter(e) {
    if(e.keyCode === 13){
        getInfo(input.value);
    }
}

async function getInfo(data){
    const res = await fetch(`${api.endpoint}weather?q=${data}&units=metric&appID=${api.key}`);
    const result = await res.json();
    displayResult(result);
}

function displayResult(result){
    let city = document.querySelector("#city");
    city.textContent = `${result.name}, ${result.sys.country}`;
    
    getOurDate();

    let temperature = document.querySelector("#temperature");
    temperature.innerHTML = `${Math.round(result.main.temp)}<span>°</span>`;

    let feelsLike = document.querySelector("#feelsLike");
    feelsLike.innerHTML = "Feels like: " + `${Math.round(result.main.feels_like)}<span>°</span>`;

    let conditions = document.querySelector("#conditions");
    conditions.textContent = `${result.weather[0].main}`;

    let variation = document.querySelector("#variation");
    variation.innerHTML = "Min: " + `${Math.round(result.main.temp_min)}<span>°</span>` + " " + "Max: " + `${Math.round(result.main.temp_max)}<span>°</span>`;
}

function getOurDate(){
    const myDate = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    let day = days[myDate.getDay()];

    let todayDate = myDate.getDate();

    let month = months[myDate.getMonth()];
    
    let year = myDate.getFullYear();

    let fullDate = document.querySelector("#date"); 
    fullDate.textContent = `${day}` + " " +  `${todayDate}` + " " + `${month}` + " " + `${year}`;    
}

