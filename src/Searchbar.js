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
    console.log(response.data.visibility);
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
      visibility: updateVisibility(response.data.visibility),
      sunrise: response.data.sys.sunrise,
      sunset: response.data.sys.sunset,
      date: new Date(response.data.dt * 1000)
    });
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  function updateVisibility(response){
    if (response === undefined){
      return 'No Data'
    }else {
      return `${Math.round(response / 1000 * 0.62137)} mi`
    }
  }


  return (
    <div id="searchbar">
      <div id="city">{city}</div>
      <DateTime {...results}/>
      <form id="search">
        <input type="text" placeholder="Username" onChange={updateCity} id="search-bar"/><br/>
        <input type="submit" onClick={(event)=>{search(event)}} value="Search" />
        <input type="submit" onClick={(event)=>{search(event)}} value="Current" />
      </form>
        <Now {...results} />
        <Details {...results}/>
    </div>
  );
}