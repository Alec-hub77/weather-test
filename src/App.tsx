import "./App.css";
import { weatherStore } from "./store/store";
import { observer } from "mobx-react-lite";
import Header from "./components/header/Header";
import SearchInput from "./components/input/SearchInput";
import Home from "./pages/Home";

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
