import React from "react";
import './details.css'

export default function Details(props) {
  let values=[
    { name: "humidity", value: `${props.humidity}%`}, 
    {name: "wind", value: `${props.wind} mph`},
    {name: "feel", value: `${Math.round(props.feel)}°`},
    {name: "pressure", value: props.pressure}, 
    {name: "sunrise", value: `${props.sunrise} AM`}, 
    {name: "sunset", value: `${props.sunset} PM`}]

  return (
    <div id="detail-container">
      <h2>Details ------------------------------------------------------------------------------</h2>
      <p id="detail-boxes">
        {values.map( ( {name, value} ) => {
        return <div className="small-details">
          <p>{name}</p>
          <p>{value}</p>
        </div>
        })}
      </p>
    </div>
  );
}
