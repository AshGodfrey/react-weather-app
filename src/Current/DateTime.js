import React from "react";
import './datetime.css'


export default function DateTime(props) {
    if (props.date !== undefined){
      let days=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      let day = days[props.date.getDay()];
      let hours = (props.date.getHours() % 12) || 12;
      let minutes = props.date.getMinutes();
      let amOrPm = (props.date.getHours()>= 12 ? 'PM' : 'AM')

      if (minutes < 10){
        minutes = `0${minutes}`
      }

      if (hours < 10){
        hours=`0${hours}`
      }

      return(
        <div> <div id="date-time">Last Updated:<br/>
        {day} {hours}:{minutes} {amOrPm}</div></div>
      )
    }

 
  return (
    <div id="date-time">
      Last Updated:
    </div>
  );
}