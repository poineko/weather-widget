import React, { useState, useEffect } from 'react';
import './MyCustomWidget.css';
import PdfFile from './YourCustomWidget.pdf'

const MyCustomWidget = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [showPdf, setShowPdf] = useState(false);

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

  const openPdf = async () => {
    try {
      const pdfResponse = await fetch(PdfFile);
      const pdfBlob = await pdfResponse.blob();
      setShowPdf(true);
    } catch (error) {
      console.error('Error fetching PDF:', error);
    }
  };

  const closePdf = () => {
    setShowPdf(false);
  };

  const renderWeatherData = () => {
    if (weatherData) {
      return (
        <div className="weather-data">
          <p>Location: {weatherData.name}</p>
          {weatherData.main && <p>Temperature: {weatherData.main.temp}°C</p>}
          {weatherData.weather && (
            <p>Description: {weatherData.weather[0].description}</p>
          )}
        </div>
      );
    } else {
      return <p>Loading weather data...</p>;
    }
  };

  const renderPdfViewer = () => {
    if (showPdf) {
      return (
        <div className="pdf-container">
          <iframe
            src={process.env.PUBLIC_URL + PdfFile}
            title="PDF Viewer"
            style={{ width: '100%', height: '500px' }}
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="weather-widget">
      <h2 className="widget-title">Weather Widget</h2>
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
      {renderWeatherData()}
      <button onClick={showPdf ? closePdf : openPdf}>
        {showPdf ? "Close PDF" : "Open PDF"}
      </button>
      {renderPdfViewer()}
    </div>
  );
};

export default MyCustomWidget;
