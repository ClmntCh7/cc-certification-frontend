import { useState } from "react";
import "../assets/styles/UserDetails.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from "react-router-dom";
import format from "date-fns/format";

const UserDetails = ({
  selectedElem,
  agencyId,
  agencyName,
  startDate,
  endDate,
  rentalDuration,
}) => {
  const location = useLocation();
  const [userInfo, setUserInfo] = useState({
    email: "",
    title: "",
    company: "",
    firstName: "",
    lastName: "",
    street: "",
    postalCode: "",
    city: "",
    birthdate: null,
    country: "",
    phoneCode: "",
    phoneNumber: "",
  });

  console.log(location);
  const { includedCharges, extraFees, cart } = location.state;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBirthdateChange = (date) => {
    setUserInfo((prevData) => ({
      ...prevData,
      birthdate: date,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

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
                type="radio"
                name="title"
                value="M."
                checked={userInfo.title === "M."}
                onChange={handleInputChange}
              />
              <label htmlFor="title-mr">M.</label>
              <input
                type="radio"
                name="title"
                value="Mme"
                checked={userInfo.title === "Mme"}
                onChange={handleInputChange}
              />
              <label htmlFor="title-mrs">Mme</label>
            </div>
            <div>
              <input
                placeholder="Société"
                type="text"
                name="company"
                value={userInfo.company}
                onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <input
                  placeholder="Adresse email *"
                  type="text"
                  name="email"
                  value={userInfo.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <input
                  placeholder="Rue *"
                  type="text"
                  name="street"
                  value={userInfo.street}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <select
                  name="country"
                  value={userInfo.country}
                  onChange={handleInputChange}
                >
                  <option value="France">France</option>
                  {/* {countries.map((country) => (
                <option key={country.code} value={country.name}>
                  {country.name}
                </option>
              ))} */}
                </select>
              </div>
              <div>
                <DatePicker
                  placeholderText="Date de naissance*"
                  selected={userInfo.birthdate}
                  onChange={handleBirthdateChange}
                  dateFormat="dd/MM/yyyy"
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={100}
                  required
                />
              </div>
            </div>

            {/* Droite */}
            <div className="rightFormBlock">
              <div>
                <input
                  placeholder="Nom de famille *"
                  type="text"
                  name="lastName"
                  value={userInfo.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <input
                  placeholder="Indicatif téléphonique *"
                  type="text"
                  name="phoneCode"
                  value={userInfo.phoneCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <input
                  placeholder="Numéro de téléphone *"
                  type="text"
                  name="phoneNumber"
                  value={userInfo.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <input
                  placeholder="Code postal *"
                  type="text"
                  name="postalCode"
                  value={userInfo.postalCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <input
                  placeholder="Ville *"
                  type="text"
                  name="city"
                  value={userInfo.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="formTitleContainer">
            <h1 className="formTitle">Vérifier et réserver</h1>
          </div>
          <div className="bookingInfoConatiner">
            <div className="carInfoContainer">
              <div className="carInfoDetails">
                <p>{`${selectedElem.headlines.description} ${selectedElem.headlines.shortSubline}`}</p>
                <div>
                  <span>{agencyName}</span>
                  <span>{`${format(startDate, "dd MMMM HH:mm")} - ${format(
                    endDate,
                    "dd MMMM HH:mm"
                  )}`}</span>
                </div>
              </div>
              <div className="carPictContainer">
                <img src={`${selectedElem.images.small}`} alt="" />
              </div>
            </div>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default UserDetails;
