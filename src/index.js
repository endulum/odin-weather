import './style.scss';

// helpers

const $ = selector => document.querySelector(selector);
const create = (element, className, idname) => {
    let x = document.createElement(element);
    if (className) x.className = className;
    if (idname) x.id = idname;
    return x;
}

// dom

$('body').appendChild(create('main'));
$('main').appendChild(create('img'));
$('main').appendChild(create('div', 'right'));
$('.right').appendChild(create('h1', 'weather'));
$('.right').appendChild(create('p', 'details'));
$('.details').appendChild(create('span', 'location'));
$('.details').appendChild(create('span', 'temperature'));
$('.right').appendChild(create('div', 'search'));
$('.search').appendChild(create('input', null, 'search-bar'));
$('.search').appendChild(create('button', null, 'do-search'));
$('#do-search').textContent = 'Search Location';

// background images for the weather (reconsidering...)

// import ClearSky from './weather-backgrounds/clear-sky.jpg'; // Zarif Ali
// import FewClouds from './weather-backgrounds/few-clouds.jpg'; // Yuriy Bogdanov
// import ScatteredClouds from './weather-backgrounds/scattered-clouds.jpg'; // Hama Haki
// import BrokenClouds from './weather-backgrounds/broken-clouds.jpg'; // Artem Anokhin
import OvercastClouds from './weather-backgrounds/overcast-clouds.jpg'; // Antoine Barres
// import ShowerRain from './weather-backgrounds/shower-rain.jpg'; // Reza Shayestehpour
// import Rain from './weather-backgrounds/rain.jpg'; // Mike Kotsch
// import Thunderstorm from './weather-backgrounds/thunderstorm.jpg'; // Levi Guzman
// import Snow from './weather-backgrounds/snow.jpg'; // Andrea Windolph
// import Mist from './weather-backgrounds/mist.jpg'; // Dave Hoefler

// weather class for making a weather object

class Weather {
    constructor(data) {
        this.location = data.name;
        this.weather = data.weather[0].description;
        this.temperature = data.main.temp;
        this.icon = data.weather[0].icon;
    }

    changeBackground() {
        // let src = '';
        // switch (this.weather) {
        //     case 'clear sky': src = ClearSky; break;
        //     case 'few clouds': src = FewClouds; break;
        //     case 'scattered clouds': src = ScatteredClouds; break;
        //     case 'broken clouds': src = BrokenClouds; break;
        //     case 'overcast clouds': src = OvercastClouds; break;
        //     case 'shower rain': src = ShowerRain; break;
        //     case 'rain': src = Rain; break;
        //     case 'thunderstorm': src = Thunderstorm; break;
        //     case 'snow': src = Snow; break;
        //     case 'mist': src = Mist; break;
        // }
        // $('body').style.backgroundImage = `url(${src})`;

        $('body').style.backgroundImage = `url(${OvercastClouds})`;
    }

    changeIcon() {
        $('img').src = `http://openweathermap.org/img/wn/${this.icon}@2x.png`;
    }

    changeDayMode() {
        if (this.icon.includes('n')) $('main').className = 'night';
        if (this.icon.includes('d')) $('main').className = 'day';
    }

    changeText() {
        $('.weather').textContent = this.weather;
        $('.location').textContent = `${this.location}`;
        $('.temperature').textContent = `${this.temperature}°`;
    }

    print() {
        console.log(`${this.location}\n${this.weather}\n${this.temperature}`);
    }
}

let currentWeather;

// fetch to get weather

const searchLocation = async term => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=';
    const key = '&appid=6c0558fee84cc61371a98f44f922bcb2';
    $('.weather').textContent = '...';
    $('.location').textContent = '...';
    $('.temperature').textContent = '...';
    try {
        const response = await fetch(url + term + key, {mode: 'cors'});
        const data = await response.json();
        currentWeather = new Weather(data);
        currentWeather.changeBackground();
        currentWeather.changeIcon();
        currentWeather.changeDayMode();
        currentWeather.changeText();
        currentWeather.print();
    } catch (e) {
        alert(e);
    }
}

// searching

searchLocation('san diego');

$('#do-search').addEventListener('click', () => {
    searchLocation($('#search-bar').value.toString());
})