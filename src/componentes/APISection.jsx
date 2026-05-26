import { useState, useEffect } from "react";
import "./APISection.css";

function APISection() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const latitude = 41.15;
  const longitude = -8.64;
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  useEffect(() => {
    const fetchWeather = async () => {
      const url = `https://api.brightsky.dev/weather?lat=${latitude}&lon=${longitude}&date=${today}`;

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setWeather(data);
      } catch (err) {
        // Mock para aula
        setWeather({
          weather: [
            { temperature: 18, precipitation: 0 },
            { temperature: 19, precipitation: 0.1 },
          ],
        });
        setError(`Failed to fetch real weather (${err.message}). Using mock data.`);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [latitude, longitude]);

  return (
    <div id="docs">
      <svg className="icon" role="presentation" aria-hidden="true">
        <use href="/icons.svg#documentation-icon"></use>
      </svg>
      <h3>React Hooks + Weather API (Bright Sky)</h3>

      <section className="weather-demo">
        {loading && <p>Loading weather data...</p>}
        {error && <p className="error">{error}</p>}
        {weather && weather.weather && weather.weather.length > 0 && (
          <div>
            <p>
              <strong>Location:</strong> Porto, Portugal
            </p>
            <p>
              <strong>First recorded temperature:</strong>{" "}
              {weather.weather[0]?.temperature} °C
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default APISection;