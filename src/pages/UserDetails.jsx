import { useState } from "react";
import "../assets/styles/UserDetails.css";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate } from "react-router-dom";
import format from "date-fns/format";
import axios from "axios";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const UserDetails = ({
  selectedElem,
  agencyName,
  startDate,
  endDate,
  rentalDuration,
  totalAmount,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [birthdate, setBirthdate] = useState(dayjs(new Date()));
  const [isVisible, setIsVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    title: "",
    company: "",
    firstName: "",
    lastName: "",
    street: "",
    postalCode: "",
    city: "",
    country: "",
    phoneCode: "",
    phoneNumber: "",
  });

  const { includedCharges, extraFees, cart } = location.state;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const userInfoCopy = { ...userInfo };
    userInfoCopy[name] = value;
    setUserInfo(userInfoCopy);
  };
  const createBooking = async () => {
    try {
      const response = await axios.post(
        `https://site--c-chevalier-sixt--m4snx7ydrpgs.code.run/rentalconfigurations/book`,
        {
          userInfo: userInfo,
          birthdate: birthdate,
          carId: selectedElem.id,
          startDate: startDate,
          endDate: endDate,
          rentalDuration: rentalDuration,
          totalAmount: totalAmount,
          selectedElem: selectedElem,
          cart: cart,
          extraFees: extraFees,
          includedCharges: includedCharges,
        }
      );

      setData(response.data);
      setIsVisible(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createBooking();
  };

  const countries = ["France", "Allemagne"];

  return (
    <div className="container">
      <div className="pageContainer">
        <form className="formContainer" onSubmit={handleSubmit}>
          <div className="formTitleContainer">
            <h1 className="formTitle">Informations personnelles</h1>
          </div>
          <div className="formTopContainer">
            <div>
              <input
                id="title-mr"
                type="radio"
                name="title"
                value="Mr"
                checked={userInfo.title === "Mr"}
                onChange={(event) => handleInputChange(event)}
              />
              <label htmlFor="title-mr">M.</label>
            </div>
            <div>
              <input
                id="title-mrs"
                type="radio"
                name="title"
                value="Mme"
                checked={userInfo.title === "Mme"}
                onChange={(event) => handleInputChange(event)}
              />
              <label htmlFor="title-mrs">Mme</label>
            </div>
            <div>
              <input
                placeholder="Société"
                type="text"
                name="company"
                value={userInfo.company}
                onChange={(event) => handleInputChange(event)}
              />
            </div>
          </div>

          <div className="formBottomContainer">
            <div className="leftFormBlock">
              <div>
                <input
                  placeholder="Prénom *"
                  type="text"
                  name="firstName"
                  value={userInfo.firstName}
                  onChange={(event) => handleInputChange(event)}
                  required
                />
              </div>
              <div>
                <input
                  placeholder="Adresse email *"
                  type="text"
                  name="email"
                  value={userInfo.email}
                  onChange={(event) => handleInputChange(event)}
                  required
                />
              </div>
              <div>
                <input
                  placeholder="Rue *"
                  type="text"
                  name="street"
                  value={userInfo.street}
                  onChange={(event) => handleInputChange(event)}
                  required
                />
              </div>
              <div>
                <select
                  name="country"
                  value={userInfo.country}
                  onChange={(event) => handleInputChange(event)}
                >
                  {countries.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
              <div className="datePicker">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    slotProps={{
                      textField: {
                        size: "small",
                        label: "Date de naissance *",
                      },
                    }}
                    value={birthdate}
                    onChange={(newValue) => setBirthdate(newValue)}
                  />
                </LocalizationProvider>
              </div>
            </div>

            <div className="rightFormBlock">
              <div>
                <input
                  placeholder="Nom de famille *"
                  type="text"
                  name="lastName"
                  value={userInfo.lastName}
                  onChange={(event) => handleInputChange(event)}
                  required
                />
              </div>
              <div>
                <input
                  placeholder="Indicatif téléphonique *"
                  type="text"
                  name="phoneCode"
                  value={userInfo.phoneCode}
                  onChange={(event) => handleInputChange(event)}
                  required
                />
              </div>
              <div>
                <input
                  placeholder="Numéro de téléphone *"
                  type="text"
                  name="phoneNumber"
                  value={userInfo.phoneNumber}
                  onChange={(event) => handleInputChange(event)}
                  required
                />
              </div>
              <div>
                <input
                  placeholder="Code postal *"
                  type="text"
                  name="postalCode"
                  value={userInfo.postalCode}
                  onChange={(event) => handleInputChange(event)}
                  required
                />
              </div>
              <div>
                <input
                  placeholder="Ville *"
                  type="text"
                  name="city"
                  value={userInfo.city}
                  onChange={(event) => handleInputChange(event)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="formTitleContainer">
            <h1 className="formTitle">Vérifier et réserver</h1>
          </div>
          <div className="bookingInfoContainer">
            <div className="carInfoContainer">
              <div className="carInfoDetails">
                <p>{`${selectedElem.headlines.description} ${selectedElem.headlines.shortSubline}`}</p>
                <div className="subInfoContainer">
                  <p>{agencyName}</p>
                  <p>{`${format(startDate, "dd MMMM HH:mm")} - ${format(
                    endDate,
                    "dd MMMM HH:mm"
                  )}`}</p>
                </div>
              </div>
              <div className="carPictContainer">
                <img
                  className="carPict"
                  src={`${selectedElem.images.small}`}
                  alt=""
                />
              </div>
            </div>
            <div>
              <p className="bookingSubTitle">Votre offre inclut</p>
              <div>
                {includedCharges.map((elem) => {
                  return <p key={elem.title}>{elem.title}</p>;
                })}
              </div>
            </div>
            <div>
              <p className="bookingSubTitle">Exigence pour les conducteurs</p>
              <div className="billLine">
                <span className="lineText">
                  {`Conducteur agé d'au moins ${selectedElem.carGroupInfo.driverMinAge} ans`}
                </span>
              </div>
            </div>
            <div>
              <p className="bookingSubTitle">Période de location</p>
              <div className="billLine">
                <span className="lineText">
                  {`Durée de la location ( ${rentalDuration} jours x ${
                    selectedElem.prices.currency
                  } 
                    ${selectedElem.prices.dayPrice.amount.toFixed(2)})`}
                </span>
                <span>
                  {`€ ${(
                    rentalDuration * selectedElem.prices.dayPrice.amount
                  ).toFixed(2)}`}
                </span>
              </div>
            </div>
            <div>
              <p className="bookingSubTitle">Protection et options</p>

              <div>
                {cart.map((elem) => {
                  return (
                    <div key={elem.id} className="billLine">
                      <span className="lineText">{elem.title}</span>
                      <span>
                        €{" "}
                        {(elem.price.unit === "jour"
                          ? elem.price.amount * rentalDuration
                          : elem.price.amount
                        ).toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <p className="bookingSubTitle">Frais</p>

              <div>
                {extraFees.map((elem) => {
                  return (
                    <div key={elem.title} className="billLine">
                      <span className="lineText">{elem.title}</span>
                      <span>
                        €{" "}
                        {(elem.price.unit === "jour"
                          ? elem.price.amount * rentalDuration
                          : elem.price.amount
                        ).toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="totalAmountBlock">
                <p className="totalSubtitle">Total</p>
                <div className="billLine">
                  <div className="totalAmount">
                    <span>€ {totalAmount} </span>
                    <span className="lineText">Taxe incluses</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="divider">
            <p>
              En cliquant sur le bouton, je confirme que j'ai lu et accépté les
              informations de location et termes et conditions.
            </p>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
      {isVisible && (
        <div
          className="confirmationContainer-root"
          onClick={() => {
            setIsVisible(false);
            navigate("/");
          }}
        >
          <div
            className="confirmationContainer"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <div className="confirmationMsgContainer">
              <p className="confirmationMsg">Reservation confirmée</p>
              <div className="confirmNumb">
                <span style={{ fontSize: 12 }}>
                  Voici la référence de votre dossier
                </span>
                <span style={{ fontSize: 14 }}>{data.bookingId}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
