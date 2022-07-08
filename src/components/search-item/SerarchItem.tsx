import { observer } from "mobx-react-lite";
import { weatherStore } from "../../store/store";
import "./search-item.scss";

const SerarchItem = () => {
  const data = weatherStore.currentWeather;
  return (
    <div className="search__item">
      {/* <div>
        {data?.name}, {data?.sys.country}
      </div>
      <div>|</div>
      <div>{data?.main.temp.toFixed()} &#8451;</div>
      <div>|</div> */}
      <button>Save</button>
    </div>
  );
};

export default observer(SerarchItem);
