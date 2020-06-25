import React, { useState } from "react";
import axios from 'axios';
import Now from './Current/Now.js'
import Details from './Current/Details.js'
import './searchbar.css'
import DateTime from './Current/DateTime.js'


export default function Searchbar() {
  let [city, setCity] = useState("Cupertino");
  let [results, setResult] = useState({});

  function search(event) {
    event.preventDefault();
    apiCall();
  }

  function apiCall() {
    let apiKey = "e573bc5f2edcf55605d7e7fcd2e01d03";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=`;
    axios
      .get(
        `${apiUrl}${city}&units=imperial&appid=${apiKey}`
      )
      .then(handleResponse);
  }

  function handleResponse(response) {
    console.log(response);
    let base = response.data.main
    setResult({
      temp: base.temp,
      description: response.data.weather[0].description,
      humidity: base.humidity,
      wind: response.data.wind.speed,
      icon: `http://openweathermap.org/img/wn/${
        response.data.weather[0].icon
      }@2x.png`,
      min: base.temp_min,
      max: base.temp_max,
      feel: base.feels_like,
      pressure: base.pressure,
      sunrise: response.data.sys.sunrise,
      sunset: response.data.sys.sunset
    });
  }

  function updateCity(event) {
    setCity(event.target.value);
  }


  return (
    <div id="searchbar">
      <div id="city">{city}</div>
      <DateTime />
      <form>
        <input type="text" placeholder="Username" onChange={updateCity} />
        <input type="submit" onClick={(event)=>{search(event)}} value="Search" />
        <br />
        <Now {...results} />
        <Details {...results}/>
      </form>
    </div>
  );
}