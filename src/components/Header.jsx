import { Link } from "react-router-dom";

const Header = () => {
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
            <div className="navItem">
              <span>BACKOFFICE</span>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
