import { action, makeObservable, observable, runInAction } from "mobx";
import { getCurrentWeather } from "../services/weather.service";
import type { WeatherData } from "../types/types";
// store
// configure({
//   useProxies: "never"
// });
interface CitiesList {
  city: string;
}

class WeatherStore {
  currentWeather: WeatherData | null = null;
  savedCities: WeatherData[] | null = [];
  isLoading = false;
  error = "";
  citiesList: CitiesList[] = [];

  constructor() {
    makeObservable(this, {
      currentWeather: observable,
      isLoading: observable,
      error: observable,
      citiesList: observable,
      savedCities: observable,
      loadWeather: action,
      saveCity: action,
      loadCitiesList: action,
      refreshWeather: action
    });
  }

  loadWeather = async (city: string) => {
    this.isLoading = true;
    try {
      const data = await getCurrentWeather(city);
      runInAction(() => {
        this.currentWeather = data;
        this.isLoading = false;
        this.error = "";
      });
    } catch (error) {
      runInAction(() => {
        this.error = "City not found";
        this.isLoading = false;
      });
    }
  };

  loadCitiesList = async (city: string) => {
    this.isLoading = true;
    try {
      const data = await getCurrentWeather(city);
      runInAction(() => {
        this.savedCities?.push(data);
        this.isLoading = false;
        this.error = "";
      });
    } catch (error) {
      runInAction(() => {
        this.error = "City not found";
        this.isLoading = false;
      });
    }
  };

  saveCity(city: string) {
    runInAction(() => {
      const items = localStorage.getItem("cities_list");
      const parsedItems = items && JSON.parse(items);
      this.currentWeather && this.savedCities?.push(this.currentWeather);
      this.currentWeather = null;
      const newList = [...parsedItems, { city }];
      localStorage.removeItem("cities_list");
      this.citiesList = newList;
      localStorage.setItem("cities_list", JSON.stringify(this.citiesList));
    });
  }

  refreshWeather = async (city: string) => {
    runInAction(() => {
      this.savedCities = this.savedCities && this.savedCities?.filter((elem) => elem.name !== city);
    });
    const data = await getCurrentWeather(city);
    runInAction(() => {
      this.savedCities?.unshift(data);
    });
  };
}

export const weatherStore = new WeatherStore();
