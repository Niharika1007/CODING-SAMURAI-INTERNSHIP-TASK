import { useState } from "react";
import Search from "./components/search/search";
import CurrentWeather from "./components/current_weather/current_weather";
import Forecast from "./components/forecast/forecast";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import "./App.css";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);

  const handleOnSearchChange = async (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    try {
      setError(null); // Reset any previous error

      const currentWeatherFetch = fetch(
        `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );
      const forecastFetch = fetch(
        `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );

      const [weatherResponse, forecastResponse] = await Promise.all([
        currentWeatherFetch,
        forecastFetch,
      ]);

      if (!weatherResponse.ok || !forecastResponse.ok) {
        throw new Error("Failed to fetch weather data. Please try again.");
      }

      const weatherData = await weatherResponse.json();
      const forecastData = await forecastResponse.json();

      setCurrentWeather({ city: searchData.label, ...weatherData });
      setForecast({ city: searchData.label, ...forecastData });
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError(err.message || "Something went wrong.");
      setCurrentWeather(null);
      setForecast(null);
    }
  };

  return (
    <div className="container">
      <h1 className="title">🌤️ Weather Forecast App</h1>
      <Search onSearchChange={handleOnSearchChange} />

      {error && <p className="error">{error}</p>}

      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
