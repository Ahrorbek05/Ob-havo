import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [regions] = useState([
    "Toshkent", "Andijon", "Farg'ona", "Namangan", "Samarqand", 
    "Buxoro", "Jizzax", "Qashqadaryo", "Sirdaryo", "Surxondaryo", 
    "Navoiy", "Xorazm"
  ]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const API_KEY = "b1b15e88fa797225412429c1c50c122a1"
  const BASE_URL = "https://api.openweathermap.org/data/2.5/";


  const fetchWeatherData = async (region) => {
    try {
      const response = await axios.get(`${BASE_URL}weather`, {
        params: {
          q: region,
          units: "metric",
          appid: API_KEY,
        },
      });
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    if (selectedRegion) {
      fetchWeatherData(selectedRegion);
    }
  }, [selectedRegion]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        Ob-havo ma'lumotlari
      </h1>
      <div className="max-w-lg mx-auto">
        <select
          className="select select-primary w-full max-w-xl"
          onChange={(e) => setSelectedRegion(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>
            Viloyatni tanlang
          </option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>

        {weatherData && (
          <div className="card bg-base-100 min-h-screen min-h-32 w-full md:w-[510px] mt-8 p-6 shadow-xl">
  <h2 className="text-xl md:text-2xl font-bold mb-4">{selectedRegion} viloyati</h2>
  <div className="text-base md:text-lg mb-4">
    Hozirgi harorat: <strong>{weatherData.main.temp}°C</strong>
  </div>
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
    <p className="text-gray-600 mb-2 md:mb-0">
      Holati: {weatherData.weather[0].description}
    </p>
    <p className="text-gray-600">
      Shamol tezligi: {weatherData.wind.speed} m/s
    </p>
  </div>
</div>
        )}
      </div>
    </div>
  );
};

export default App;
