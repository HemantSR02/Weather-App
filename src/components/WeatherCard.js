import React from 'react'
import './WeatherCard.css'
import Loader from './Loader';
import { useState } from 'react';

const Weather = () => {

  const [city, setCity] = useState("Indore");
  const [data, setData] = useState(null); // Declare data state variable\
  const [loading,setloading]= useState(false);
  


  const handleClick = async () => {
    try {
      setloading(true);
      const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=7e2ba163c7bd4ff0a6c72150240703&q=${city}&aqi=yes`);
      const responseData = await res.json();
      setData(responseData);
      setloading(false);
      
    } catch (error) {
      console.error("Error fetching data:", error);

    }
  }



  return (
    <>
      <div className='body'>
        <div className='container'>

          <div className='search-box'>
            <input
              type='text'
              placeholder="Enter city name"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <button onClick={handleClick}>Search</button>
          </div>


          {loading?(<Loader/>):(data && (
            <div className='weather-card'>
              {data.error && data.error.code === 1006 ? (
                <div className='error-message'>
                  <img src="/404.png" alt="error" />
                  <p>Location Not Found</p>
                </div>
              ) : (
                <>
                  <div className='countryinfo'>
                    <h2>
                      {data.location.name}, {data.location.country}
                    </h2>

                    <h4>{data.location.localtime}</h4>
                  </div>
                  <div className='weathercondition'>
                    <p>{data.current.condition.text}</p>
                    <img className='icon' src={data.current.condition.icon} alt='weather-image' />
                  </div>
                  <div className='more-info'>
                    <p>Temperature: {data.current.temp_c}°C</p>
                    <p>WindSpeed: {data.current.wind_kph}</p>
                    <p>Humidity: {data.current.humidity}</p>
                    <p>Gust: {data.current.gust_kph}</p>
                  </div>

                </>
              )}
            </div>
          ))}
        </div>
      </div>

    </>

  )
}

export default Weather


