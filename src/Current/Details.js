import React from "react";
import './details.css'

export default function Details(props) {
  let values=[
    { name: "humidity", value: `${props.humidity}%`}, 
    {name: "wind", value: `${props.wind} mph`},
    {name: "feel", value: `${Math.round(props.feel)}°`},
    {name: "pressure", value: props.pressure}, 
    {name: "sunrise", value: `${formatHours((props.sunrise) * 1000)}`}, 
    {name: "sunset", value: `${formatHours(props.sunset *1000)}`}]
    
    function formatHours(timestamp){
      let date = new Date(timestamp);
      let hours = date.getHours();
      let amOrPm = hours >= 12 ? 'PM' : 'AM';
      hours = (hours % 12) || 12;
      if (hours < 10){
        hours = `0${hours}`;
      }
      let minutes = date.getMinutes();
      if(minutes < 10){
        minutes =  `0${minutes}`;
      }
    
      let today = date.getDate()
      return `${hours}:${minutes} ${amOrPm} `
    }

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
