
import React, { Component } from "react";
import './App.css';

const PLACES = [
  { name: "Krasnodar", zip: "542420" },
  { name: "Abakan", zip: "1512236" },
  { name: "Feodosiya", zip: "709161" },
  { name: "Arkhipo-Osipovka", zip: "580969" }
];


class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null
    };
  }

  componentDidMount() {
    const zip = this.props.zip;
    const URL = "http://api.openweathermap.org/data/2.5/weather?id=" +
      zip +
      "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial";
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ weatherData: json });
    });
  }
  render() {
    const weatherData = this.state.weatherData;
    if (!weatherData) return <div>Loading</div>;
    const weather = weatherData.weather[0];
    const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
    return (
      <div>
        <h1>
          {weather.main} in {weatherData.name}
          <img src={iconUrl} alt={weatherData.description} />
        </h1>
        <p>Current: {Math.round((weatherData.main.temp - 32) * 5 / 9)}°</p>
        <p>High: {Math.round((weatherData.main.temp_max - 32) * 5 / 9)}°</p>
        <p>Low: {Math.round((weatherData.main.temp_min - 32) * 5 / 9)}°</p>
        <p>Wind Speed: {Math.round(weatherData.wind.speed / 2.237)} m/s</p>
      </div>
    );
  }
}
class App extends Component {
  constructor() {
    super();
    this.state = {
      activePlace: 0,
    };
  }
  render() {
    const activePlace = this.state.activePlace;
    return (
      <div className="App">
      {PLACES.map((place, index) => (
        <button
          key={index}
          onClick={() => {
            this.setState({ activePlace: index });
          }}
        >
          {place.name}
        </button>
      ))}
      <WeatherDisplay key={activePlace} zip={PLACES[activePlace].zip} />
    </div>
    );
  }
}

export default App;
