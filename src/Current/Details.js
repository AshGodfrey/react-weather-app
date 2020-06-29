import React from "react";
import './details.css'

export default function Details(props) {
  let values=[
    { name: "humidity", value: `${props.humidity}%`}, 
    {name: "wind", value: `${props.wind} mph`},
    {name: "feel", value: `${Math.round(props.feel)}°`},
    {name: "Visibility", value: `${props.visibility}`}, 
    {name: "sunrise", value: sunTime(props.sunrise)}, 
    {name: "sunset", value: sunTime(props.sunset)}
  ]

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
