import { useEffect, useState } from "react";
import "../assets/styles/Backoffice.css";
// import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import BookingTable from "../components/BookingTable";

const Backoffice = ({
  password,
  storedPassword,
  setStoredPassword,
  setPassword,
  backofficePassword,
  isLogged,
  setIsLogged,
}) => {
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState();

  const [isLoading, setIsLoading] = useState(true);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  useEffect(() => {
    if (storedPassword === backofficePassword) {
      setIsLogged(true);
    }
    const getBookings = async () => {
      try {
        const response = await axios.get(
          `https://site--c-chevalier-sixt--m4snx7ydrpgs.code.run/bookings`
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    getBookings();
  }, [backofficePassword, storedPassword, setIsLogged]);

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    setIsError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== backofficePassword) {
      setIsError(true);
      console.log("Wrong password");
    } else {
      console.log("Correct Password");
      setStoredPassword(Cookies.set("password", password));
      setPassword("");
      setIsLogged(true);
    }
  };

  return (
    <div className="container">
      {isLogged ? (
        isLoading ? (
          <p>Loading</p>
        ) : (
          <div className="bookingContainer">
            <div className="bookingWrapper">
              <div>
                <BookingTable
                  data={data}
                  setData={setData}
                  rowSelectionModel={rowSelectionModel}
                  setRowSelectionModel={setRowSelectionModel}
                />
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="passwordContainer">
          <form onSubmit={handleSubmit}>
            <h1>Se connecter</h1>
            <input
              placeholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <input type="submit" value="Submit" />
          </form>
          {isError && <div>Le mot de pass est incorrecte</div>}
        </div>
      )}
    </div>
  );
};

export default Backoffice;
