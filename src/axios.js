const fetchForecastData = async (region) => {
    const response = await axios.get(`${BASE_URL}forecast/daily`, {
      params: {
        q: region,
        units: "metric",
        cnt: 7, // 7 kunlik prognoz
        appid: API_KEY
      }
    });
    setForecastData(response.data);
  };
  