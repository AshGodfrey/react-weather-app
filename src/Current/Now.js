import React from "react";
import './now.css';

export default function Now(props) {
  return (
    <div id="today">
      <div id="forecast-top">
        <img src={props.icon} alt="weather icon" id="weather-icon"/>
        <p id="description">{props.description}</p>
      </div>
      <div id="temperature-box">
        <p id="current-temp">{Math.round(props.temp)}°</p>
        <div id="side-temps">
          <p id="now-high">{Math.round(props.min)}°</p>
          <p id="now-low"><strong>{Math.round(props.max)}°</strong></p>
      </div>
      </div>
    </div>
  );
}
