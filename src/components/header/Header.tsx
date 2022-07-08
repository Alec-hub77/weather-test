import "./header.scss";
import logo from "../../assets/logo.png";

const Header = () => {
  return (
    <div className="header">
      <div className="header__wrapper">
        <img src={logo} alt="log" />
        <h1>Weather Forecast</h1>
      </div>
    </div>
  );
};

export default Header;
