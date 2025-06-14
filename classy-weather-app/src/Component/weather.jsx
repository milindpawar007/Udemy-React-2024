import React, { useState } from 'react'




function Weather() {
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = useState(false);
  const [displayLocation, setDisplayLocation] = useState('');
  const [weatherData, setWeatherData] = useState({});

  function getWeatherIcon(wmoCode) {
    const icons = new Map([
      [[0], "☀️"],
      [[1], "🌤"],
      [[2], "⛅️"],
      [[3], "☁️"],
      [[45, 48], "🌫"],
      [[51, 56, 61, 66, 80], "🌦"],
      [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
      [[71, 73, 75, 77, 85, 86], "🌨"],
      [[95], "🌩"],
      [[96, 99], "⛈"],
    ]);
    const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
    if (!arr) return "NOT FOUND";
    return icons.get(arr);
  }

  function convertToFlag(countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  }

  function formatDay(dateStr) {
    return new Intl.DateTimeFormat("en", {
      weekday: "short",
    }).format(new Date(dateStr));
  }

  async function getWeather(location) {
    try {
      // 1) Getting location (geocoding)


      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
      );
      const geoData = await geoRes.json();
      console.log(geoData);

      if (!geoData.results) throw new Error("Location not found");

      const { latitude, longitude, timezone, name, country_code } =
        geoData.results.at(0);
      setDisplayLocation({ displayLocation: `${name} ${convertToFlag(country_code)}` });

      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();
      setWeatherData({ weather: weatherData.daily });
    } catch (err) {
      console.err(err);
    }
  }

  function handleSearch() {
    setLoading(true);
    getWeather(input);
    setLoading(false);
  }
  return (
    <div className='weather'>
      <h1>Classy Weather</h1>
      <div className='search'>
        <input type="text" placeholder='Search from Location ...' onChange={(e) => { setInput(e.target.value) }} />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading && <p>Loading...</p>}
      {displayLocation && <h2>{displayLocation.displayLocation}</h2>}

      {weatherData.weather && (
        <div className='weather-data'>
          <h3>Weather Forecast</h3>
          <ul className="weather" >
            {weatherData.weather.time.map((date, index) => (
              <li key={index}>
                <span>{formatDay(date)}</span>
                <span>{getWeatherIcon(weatherData.weather.weathercode[index])}</span>
                <span>Max: {weatherData.weather.temperature_2m_max[index]}°C</span>
                <span>Min: {weatherData.weather.temperature_2m_min[index]}°C</span>
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  )
}

export default Weather
