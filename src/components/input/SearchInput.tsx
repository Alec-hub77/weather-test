import { useState } from "react";
import { weatherStore } from "../../store/store";
import "./search-input.scss";

const SearchInput = () => {
  const [searchTherms, setSearchTherms] = useState<string>("");
  const searchWeather = () => {
    const search = searchTherms?.trim();
    if (search) {
      weatherStore.loadWeather(search);
    }
    setSearchTherms("");
  };
  return (
    <div className="search__input">
      <input
        type="text"
        value={searchTherms}
        placeholder="Find your location..."
        onChange={(e) => setSearchTherms(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && searchWeather()}
      />
      <button onClick={searchWeather}>Find</button>
    </div>
  );
};

export default SearchInput;
//input
