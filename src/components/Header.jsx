import Cookies from "js-cookie";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Header = ({ isLogged, setIsLogged }) => {
  useEffect(() => {}, [isLogged]);

  return (
    <div className="container">
      <header>
        <Link to={"/"}>
          <div className="logoContainer">
            <img
              className="logo"
              src="./src/assets/images/sixt-logo.png"
              alt=""
            />
          </div>
        </Link>
        <div className="navContainer">
          <div className="leftNavContainer">
            <div className="navItem">
              <span>RENT</span>
            </div>
            <div className="navItem">
              <span>SHARE</span>
            </div>
          </div>
          <div className="rightNavContainer">
            <Link to={"/backoffice"}>
              <div className="navItem">
                <span>BACKOFFICE</span>
              </div>
            </Link>
            {isLogged && (
              <button
                onClick={() => {
                  Cookies.remove("password");
                  setIsLogged(false);
                }}
              >
                Se déconnecter
              </button>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
