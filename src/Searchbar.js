import React, { useState } from "react";
import axios from 'axios';
import Now from './Current/Now.js'
import Details from './Current/Details.js'
import './searchbar.css'
import DateTime from './Current/DateTime.js'
import Header from './Header/Header.js'


export default function Searchbar() {
  let units= 'imperial'
  let [city, setCity] = useState("");
  let [results, setResult] = useState({});
  let [clicked, setClicked] = useState(false)
  let apiKey= "e573bc5f2edcf55605d7e7fcd2e01d03";

  function search(event) {
    event.preventDefault();
    updateClicked();
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=`;
    axios
      .get(
        `${apiUrl}${city}&units=${units}&appid=${apiKey}`
      )
      .then(handleResponse);
  }

  function handleResponse(response) {
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
      sunrise: sunTime(new Date(response.data.sys.sunrise * 1000)),
      sunset: sunTime(new Date(response.data.sys.sunset * 1000)),
      date: new Date(response.data.dt * 1000),
    });
  }

  function showPosition(position){
    let longitude = position.coords.longitude
    let latitude = position.coords.latitude
    axios
      .get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}${units}&appid=${apiKey}`)
      .then(handleResponse);
    console.log(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}${units}&appid=${apiKey}`)
  }
  
  function currentLocation(event){
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition)
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  function updateClicked(event) {
    setClicked(true);
  }

  function updateVisibility(response){
    if (response === undefined){
      return 'No Data'
    }else {
      return `${Math.round(response / 1000 * 0.62137)} mi`
    }
  }

  function sunTime(props){
    if (props !== undefined){
      let hours = (props.getHours() % 12) || 12;
      let minutes = props.getMinutes();
      let amOrPm = (props.getHours()>= 12 ? 'PM' : 'AM')
      if (minutes < 10){
        minutes = `0${minutes}`
      }

      if (hours < 10){
        hours=`0${hours}`
      }
      return (`${hours}:${minutes} ${amOrPm}`)
    }
  }

  function showResults(){
    if (clicked === false) {
      console.log('test')
    } else {
      return(<div>
        <Now {...results} />
        <Details {...results}/> 
      </div>)
    }
  }

  return (
    <div id="searchbar">
      {clicked ? (
        <div>
          <div id="city">{city}</div>
          <div id="date-time">
            Last Updated: 
            <DateTime {...results}/>
          </div>
        </div>
      ) : (<Header />)}
     
      <form id="search">
        <input type="text" placeholder="Search" onChange={updateCity} id="search-bar"/><br/>
        <input className='search-button' type="submit" onClick={(event)=>{search(event)}} value="Search" />
        <input className='search-button' type="submit" onClick={(event)=>{currentLocation(event)}} value="Current" />
      </form>
      {clicked ? (<div>
        <Now {...results} />
        <Details {...results}/> 
      </div>) :
      (<br/>)}
    </div>
  );
}