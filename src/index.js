import './style.scss';

const $ = selector => document.querySelector(selector);

$('body').appendChild(document.createElement('main'));
$('main').appendChild(document.createElement('img'));

import ClearSky from './weather-backgrounds/clear-sky.jpg'; // Zarif Ali
import FewClouds from './weather-backgrounds/few-clouds.jpg'; // Yuriy Bogdanov
import ScatteredClouds from './weather-backgrounds/scattered-clouds.jpg'; // Hama Haki
import BrokenClouds from './weather-backgrounds/broken-clouds.jpg'; // Artem Anokhin
import OvercastClouds from './weather-backgrounds/overcast-clouds.jpg'; // Antoine Barres
import ShowerRain from './weather-backgrounds/shower-rain.jpg'; // Reza Shayestehpour
import Rain from './weather-backgrounds/rain.jpg'; // Mike Kotsch
import Thunderstorm from './weather-backgrounds/thunderstorm.jpg'; // Levi Guzman
import Snow from './weather-backgrounds/snow.jpg'; // Andrea Windolph
import Mist from './weather-backgrounds/mist.jpg'; // Dave Hoefler

class Weather {
    constructor(data) {
        this.location = data.name;
        this.weather = data.weather[0].description;
        this.temperature = data.main.temp;
        this.icon = data.weather[0].icon;
    }

    changeBackground() {
        let src = '';
        switch (this.weather) {
            case 'clear sky': src = ClearSky; break;
            case 'few clouds': src = FewClouds; break;
            case 'scattered clouds': src = ScatteredClouds; break;
            case 'broken clouds': src = BrokenClouds; break;
            case 'overcast clouds': src = OvercastClouds; break;
            case 'shower rain': src = ShowerRain; break;
            case 'rain': src = Rain; break;
            case 'thunderstorm': src = Thunderstorm; break;
            case 'snow': src = Snow; break;
            case 'mist': src = Mist; break;
        }
        $('body').style.backgroundImage = `url(${src})`;
    }

    changeIcon() {
        $('img').src = `http://openweathermap.org/img/wn/${this.icon}@2x.png`;
    }

    print() {
        console.log(`${this.location}\n${this.weather}\n${this.temperature}`);
    }
}

let currentWeather;

const searchLocation = async term => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=';
    const key = '&appid=6c0558fee84cc61371a98f44f922bcb2'
    try {
        const response = await fetch(url + term + key, {mode: 'cors'});
        const data = await response.json();
        currentWeather = new Weather(data);
        currentWeather.changeBackground();
        currentWeather.changeIcon();
        currentWeather.print();
    } catch (e) {
        alert(e);
    }
}

searchLocation('tokyo');