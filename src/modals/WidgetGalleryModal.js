import React, { useState, useEffect } from 'react';

const MyCustomWidget = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const fetchWeatherData = async () => {
    try {
      const apiKey = 'b7bfca7b27a3485144fea086c50d09dc';
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [location]);

  return (
    <div className="weather-widget">
      <h2>Weather Widget</h2>
      <div className="location-input">
        <label htmlFor="location">Enter Location:</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={handleLocationChange}
        />
        <button onClick={fetchWeatherData}>Get Weather</button>
      </div>
      {weatherData ? (
        <div className="weather-data">
          <p>Location: {weatherData.name}</p>
          {weatherData.main && <p>Temperature: {weatherData.main.temp}°C</p>}
          {weatherData.weather && (
            <p>Description: {weatherData.weather[0].description}</p>
          )}
          <embed src="assets/myfile.pdf" type="application/pdf" width="100%" height="500px" />
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default MyCustomWidget;
