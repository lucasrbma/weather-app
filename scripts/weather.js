const api = {
    key : "e275b0eabfa365c53579afc32e053cc0",
    url: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(event) {
    if (event.keyCode == 13) {
        getResults(searchbox.value);
    }
}

function getResults(query) {
    fetch(`${api.url}weather?q=${query}&units=metric&appid=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults).then;
}

function displayResults(weather) {

    let city = document.querySelector('.city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let iconElement = document.querySelector('.weather div');
    iconElement.innerHTML = `<img src="./images/${weather.weather[0].icon}.svg">`;
    
    let weatherElement = document.querySelector('.weather p');
    weatherElement.innerText = weather.weather[0].description;
    
    let humidityElement = document.querySelector('.humidity p');
    humidityElement.innerText = `${weather.main.humidity}%`;
    
    let windElement = document.querySelector('.wind p');
    windElement.innerText = `${weather.wind.speed}m/s`;

    let temp = document.querySelector('.temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}°`;

    searchbox.value = '';
}