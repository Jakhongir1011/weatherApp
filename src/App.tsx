// ES6
// 2. fetch
// fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=1`,{
//   method: 'GET',
//   headers: {
//     'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
//     'x-rapidapi-key': '45003564e1msh7d9cf50bf068e99p18184djsn26b64859fac9',
//   },
// })
//   .then((response)=>{
//     console.log(response);
//     response.json()
//     .then((data) => console.log(data))
//   })

//   .catch((err)=>{
//   console.log(err)
//   })

// ES5
// 1. Promise
    // pending
    // resolved
    // rejected
//    const qarz = new Promise((resolve, rejects)=>{
//      setTimeout(()=>resolve(123),1000)
//    })
//    .then((qiymat)=> {
//      console.log('berdi', qiymat);
//      console.log(qarz);
//    })
//    .catch((bermadi)=>{
//      console.log('bermadi', bermadi);
//    })
// console.log(qarz);


import { rejects } from 'assert';
import { log } from 'console';
import { resolve } from 'dns';
import { METHODS } from 'http';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import logo from './logo.svg';
import { WeatherForecast, WeatherForecastError } from './weatherTypes';

function App() {

  const [city, setCity] = useState('');
  const handleCityWrite = (e: ChangeEvent<HTMLInputElement>)=> setCity(e.target.value) 

  const [weather, setWeather] = useState<null | WeatherForecast>(null)


  // ES7
  const handleSubmit = async (e: FormEvent<HTMLFormElement>)=> {
    e.preventDefault()

  const data = await  fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=1`,{
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
        'x-rapidapi-key': '45003564e1msh7d9cf50bf068e99p18184djsn26b64859fac9',
      },
    })

  const info: WeatherForecast = await data.json();
  setWeather(info)
  // console.log(info);
  setCity('')
}


  return (
    <div className="App">
      <header className='header container' >
        <img src={logo} alt="React logo" className='header__logo' />
        <h1 className='header__title' >React weather App</h1>
      </header>
      <form onSubmit={handleSubmit} className='search container'>
        <input className='search__input' type="text" value={city} onChange={handleCityWrite} />
        <button className='search__button' >
          Get Weather
        </button>
      </form>
      <div className="info container">
        <h2 className="info__region">{weather === null ? 'Enter your city' :  `${weather.location.country} , ${weather.location.region}`}</h2>
        {
          weather && (
            <div className="info__data">
            <h3 className="info__type">Now:</h3>
            <div className="info__item">
              Temperature: <span>{weather.current.temp_c}&deg;C</span>
            </div>
            <div className="info__item">
              Feels like: <span>{weather.current.feelslike_c}&deg;C</span>
            </div>
            <div className="info__item">
              Humidity: <span>{weather.current.humidity}%</span>
            </div>
            <div className="info__item">
              Pressure: <span>{weather.current.pressure_mb} mb</span>
            </div>
            <div className="info__item">
              Visibility: <span>{weather.current.vis_km} km</span>
            </div>
            <div className="info__item">
              Wind: <span>{weather.current.wind_kph}km/h</span>
            </div>
            <div className="info__item">
              Wind degree: <span>{weather.current.wind_degree}&deg;C</span>
            </div>
            <div className="info__item">
              UV Index: <span>{weather.current.uv} of 10</span>
            </div>
          </div>
          )
        }
      </div>
    </div>
  );
}

export default App;




