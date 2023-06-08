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
            <div className="navItem">
              <span>RIDE</span>
            </div>
            <div className="navItem">
              <span>SIXT+ </span>
              <span style={{ fontSize: 12 }}> ABONNEMENT AUTO</span>
            </div>
          </div>
          <div className="rightNavContainer">
            <Link className="link" to={"/backoffice"}>
              <div className="navItem link">
                <span>BACKOFFICE</span>
              </div>
            </Link>
            {isLogged && (
              <button
                className="activeSixtButton"
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
