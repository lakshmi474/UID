import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import "./App.css";

function App() {
  const [city, setCity] = useState("Chennai"); // Default city
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async (cityName) => {
    if (!cityName) return;

    try {
      const apiKey = "5890ba333d855fe46129df4ed716b158"; // Replace with your working OpenWeatherMap API Key
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        cityName
      )}&units=metric&appid=${apiKey}`;

      const response = await axios.get(url);
      setWeather(response.data);
      setError("");
    } catch (err) {
      console.error("API Error:", err.response?.data || err.message);
      if (err.response?.status === 404) {
        setError("City not found! Please try again.");
      } else if (err.response?.status === 401) {
        setError("Invalid API Key. Please check your key.");
      } else {
        setError("Something went wrong. Try again later.");
      }
      setWeather(null);
    }
  };

  // Fetch default city on first load
  useEffect(() => {
    fetchWeather(city);
  }, []);

  return (
    <div className="app">
      <h1>🌤 Weather App</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={() => fetchWeather(city)}>Get Weather</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && <WeatherCard data={weather} />}
    </div>
  );
}

export default App;
