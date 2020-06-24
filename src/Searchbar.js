import React, { useState } from "react";
import SearchResults from "./SearchResults.js";
import axios from "axios";

export default function Searchbar() {
  let [city, setCity] = useState("");
  let [results, setResult] = useState({});

  function search(event) {
    event.preventDefault();
    let apiKey = "e573bc5f2edcf55605d7e7fcd2e01d03";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=`;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
      )
      .then(handleResponse);
  }

  function handleResponse(response) {
    console.log(response);
    setResult({
      temp: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: `http://openweathermap.org/img/wn/${
        response.data.weather[0].icon
      }@2x.png`
    });
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  return (
    <div>
      <form>
        <input type="text" placeholder="Username" onChange={updateCity} />
        <input type="submit" onClick={(event)=>{search(event)}} value="Search" />
        <br />
        <SearchResults {...results} />
      </form>
    </div>
  );
}