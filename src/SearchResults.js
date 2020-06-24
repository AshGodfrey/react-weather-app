import React from "react";
import axios from "axios";

export default function SearchResults(props) {
  return (
    <ul>
      <li>Temperature: {props.temp}</li>
      <li>Description: {props.description}</li>
      <li>Humidity: {props.humidity}</li>
      <li>Wind: {props.wind} </li>
      <li>
        icon: <img src={props.icon} alt="weather icon" />
      </li>
    </ul>
  );
}
