import "./weather-card.scss";
import umbrella from "../../assets/images/icon-umberella.png";
import wind from "../../assets/images/icon-wind.png";
import { weatherStore } from "../../store/store";
import dayjs from "dayjs";
import { apiConfig } from "../../services/apiConfig";
import type { WeatherData } from "../../types/types";
import { observer } from "mobx-react-lite";
import { useState } from "react";

interface CurrentWeatherProps {
  data: WeatherData;
}
interface citiesList {
  city: string;
  isSaved: boolean;
}

const WeatherCard: React.FC<CurrentWeatherProps> = ({ data }) => {
  const citiesList = localStorage.getItem("cities_list");
  const parsedCitiesList = citiesList && JSON.parse(citiesList);
  const disabledBtn =
    parsedCitiesList && !!parsedCitiesList.find((item: citiesList) => item.city === data.name);
  const [showBtn, setShowBtn] = useState(disabledBtn);

  const date = dayjs.unix(data.dt).format("MMMM D, YYYY");
  const icon = data && apiConfig.icon(data?.weather[0].icon);

  const saveCard = () => {
    weatherStore.saveCity(data.name);
    setShowBtn(true);
  };

  return (
    <div className="current__weather">
      <div className="current__weather-wrapper">
        <div className="current__weather-date">
          <div>{date}</div>
          <button className="close">&times;</button>
        </div>
        <div className="current__weather-city">
          {data.name}, {data.sys.country}
        </div>
        <div className="current__weather-temp">
          <div className="deg">{data.main.temp.toFixed()} &#8451;</div>
          <div className="tem_ico">
            <img src={icon ? icon : ""} alt="" />
          </div>
        </div>
        <div className="current__weather-info">
          <span>
            <img src={umbrella} alt="icon" />
            {data.main.humidity}%
          </span>
          <span>
            <img src={wind} alt="icon" />
            {data.wind.speed} m/s
          </span>
          <div className="action-btn">
            {!showBtn && <button onClick={saveCard}>Save</button>}
            <button onClick={() => weatherStore.refreshWeather(data.name)}>Refresh</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(WeatherCard);
