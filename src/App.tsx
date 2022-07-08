import "./App.css";
import { weatherStore } from "./store/store";
import { observer } from "mobx-react-lite";
import Header from "./components/header/Header";
import SearchInput from "./components/input/SearchInput";
import WeatherCard from "./components/weather-card/WeatherCard";
import { useEffect } from "react";
import Home from "./pages/Home";

// const citiesList = [
//   {
//     city: "London",
//     isSaved: true
//   },
//   {
//     city: "Paris",
//     isSaved: true
//   }
// ];

const App: React.FC = () => {
  return (
    <>
      <Header />
      <SearchInput />
      <Home />
    </>
  );
};

export default observer(App);
