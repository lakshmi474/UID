import React from "react";

const WeatherCard = ({ data }) => {
  return (
    <div className="weather-card">
      <h2>{data.name}, {data.sys.country}</h2>
      <h3>{data.weather[0].main}</h3>
      <p>🌡 Temperature: {data.main.temp}°C</p>
      <p>💨 Wind Speed: {data.wind.speed} m/s</p>
      <p>☁ Condition: {data.weather[0].description}</p>
    </div>
  );
};

export default WeatherCard;
