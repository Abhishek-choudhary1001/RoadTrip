import React, { useState, useEffect } from 'react';

export default function WeatherWidget({ location = "New York" }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/weather/${location}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) throw new Error(data.error.info);
        setWeather(data);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [location]);

  if (!weather && !loading && !error) return null;

  return (
    <div className="absolute right-4 top-16 z-50 bg-white rounded-lg shadow-lg p-4 w-48">
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-red-500 text-center">Error: {error}</div>}
      {weather && (
        <div>
          <h3 className="font-bold">Weather in {weather.location?.name}</h3>
          <p>Temperature: {weather.current?.temperature}°C</p>
          <p>Weather: {weather.current?.weather_descriptions[0]}</p>
        </div>
      )}
    </div>
  );
}
