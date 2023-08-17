import React, { useState, useEffect } from 'react';
import Clock from "./clock"

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [cityname, setCityname] = useState('Paris');
  const [isInputFocused, setIsInputFocused] = useState(false);

  const APIkey = 'b7b59922673b03e6119e531cad7cf167';

  const handleClick = () => {
    fetchWeatherData(cityname);
  };

  const fetchWeatherData = (city) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`)
      .then(response => response.json())
      .then(data => {
        setWeatherData(data);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  };

  const handleBlur = () => {
    fetchWeatherData(cityname);
    setIsInputFocused(false);
  };

  const handleFocus = () => {
    setIsInputFocused(true);
  };

  useEffect(() => {
    if (!isInputFocused) {
      const timeoutId = setTimeout(() => {
        fetchWeatherData(cityname);
      }, 1000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [cityname, isInputFocused]);


  const weather = () => {
    const mainWeather = weatherData.weather[0].main;
    
    if (mainWeather === "Clouds" || mainWeather === "Mist" || mainWeather === "Fog") {
        return <i class="fa-solid fa-cloud"></i>;
    } else if (mainWeather === "Clear"){
        return <i class="fa-solid fa-sun"></i>;
    } else if (mainWeather === "Rain"){
        return <i class="fa-solid fa-cloud-showers-heavy"></i>;
    } else if (mainWeather === "Thunderstorm"){
        return <i class="fa-solid fa-cloud-bolt"></i>;
    } else if (mainWeather === "Snow"){
        return <i class="fa-solid fa-snowflake"></i>;
    } else {
        return null; // Gérer les autres conditions si nécessaire
    }
};


//bg-yellow-400

  return (
    <div>
      <div className='flex items-center justify-center flex-col gap-5 h-screen bg-cyan-600 text-neutral-50'>
        <div className='border-2 border-white border-solid rounded-3xl p-8 flex items-center justify-center flex-col gap-12 shadow-lg'>

          <form className="border-2 border-white border-solid rounded-3xl p-3 inline-flex " autoComplete="off">
            <input
            className="input bg-cyan-600"
            name="cityname"
            type="text"
            size="15"
            placeholder="Search city…"
            value={cityname}
            onChange={e => setCityname(e.target.value)}
            onBlur={handleBlur}
            onFocus={handleFocus}
            />
            <button  className="searchBTN" type="button" onClick={handleClick}>
                <i class="fa-solid fa-magnifying-glass duration-100 hover:scale-110"></i>
            </button>
          </form>
          {weatherData && (
            <div className='flex flex-col items-center gap-10 font-semibold'>
              <h2 className='text-4xl'>{weatherData.name}</h2>
              <p className='text-7xl'>{weatherData.main.temp}°C</p>
              <p className='text-5xl'>{weather()}</p>
              <Clock/>
            </div>
          )}
      </div>
   
          </div>
    </div>
  );
};

export default WeatherApp;
