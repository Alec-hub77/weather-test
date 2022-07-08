import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import WeatherCard from "../components/weather-card/WeatherCard";
import { weatherStore } from "../store/store";
import "./home.scss";

interface citiesList {
  city: string;
}

// home component

const Home: React.FC = () => {
  useEffect(() => {
    const items = localStorage.getItem("cities_list");
    const parsedItems = items && JSON.parse(items);
    parsedItems?.forEach((elem: citiesList) => {
      weatherStore.loadCitiesList(elem.city);
    });
  }, []);

  return (
    <div className="home">
      <div className="error">
        {weatherStore.error && <div className="content">{weatherStore.error}</div>}
      </div>
      {weatherStore.isLoading ? (
        <div className="content">Loading...</div>
      ) : (
        weatherStore.currentWeather && (
          <div className="content">
            {weatherStore.currentWeather && (
              <WeatherCard
                key={weatherStore.currentWeather.id}
                data={weatherStore.currentWeather}
              />
            )}
          </div>
        )
      )}
      <div className="cities__list">
        {weatherStore.savedCities?.map((item) => (
          <WeatherCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default observer(Home);
