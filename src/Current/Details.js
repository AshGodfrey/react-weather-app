import React from "react";
import './details.css'

export default function Details(props) {
  let values=[
    { name: "humidity", value: `${props.humidity}%`}, 
    {name: "wind", value: `${props.wind} mph`},
    {name: "feel", value: `${Math.round(props.feel)}°`},
    {name: "visibility", value: `${props.visibility}`}, 
    {name: "sunrise", value: `${props.sunrise}`}, 
    {name: "sunset", value: `${props.sunset}`}
  ]



  return (
    <div id="detail-container">
      <h2>Details ------------------------------------------------------------------------------</h2>
      <p id="detail-boxes">
        {values.map( ( {name, value} ) => {
        return <div className="small-details">
          <p className='detail-names'>{name}</p>
          <p className='detail-values'>{value}</p>
        </div>
        })}
      </p>
    </div>
  );
}
