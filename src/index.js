class Weather {
    constructor(data) {
        this.location = data.name;
        this.weather = data.weather[0].description;
        this.temperature = data.main.temp;
    }

    print() {
        console.log(`${this.location}\n${this.weather}\n${this.temperature}`);
    }
}

let currentWeather;

const searchLocation = async term => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=';
    const key = '&appid=6c0558fee84cc61371a98f44f922bcb2'
    const response = await fetch(url + term + key, {mode: 'cors'});
    const data = await response.json();
    currentWeather = new Weather(data);
    currentWeather.print();
}

searchLocation('Tokyo');