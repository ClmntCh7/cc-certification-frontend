import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

// Pages
import Home from "./pages/Home";
import OfferList from "./pages/OfferList";
import OfferConfig from "./pages/OfferConfig";
import UserDetails from "./pages/UserDetails";
import Backoffice from "./pages/Backoffice";

// Components
import Header from "./components/Header";

const App = () => {
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [agencyId, setAgencyId] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [selectedElem, setSelectedElem] = useState();
  const [rentalDuration, setRentalDuration] = useState(1);
  const [totalAmount, setTotalAmount] = useState();
  const [password, setPassword] = useState("");
  const backofficePassword = "HelloWorld!";
  const [isLogged, setIsLogged] = useState(false);
  const [storedPassword, setStoredPassword] = useState(Cookies.get("password"));

  useEffect(() => {
    if (storedPassword === backofficePassword) {
      setIsLogged(true);
    }
  }, [storedPassword]);

  return (
    <Router>
      <Header isLogged={isLogged} setIsLogged={setIsLogged} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              search={search}
              setSearch={setSearch}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              agencyId={agencyId}
              setAgencyId={setAgencyId}
              agencyName={agencyName}
              setAgencyName={setAgencyName}
              totalAmount={totalAmount}
              setTotalAmount={setTotalAmount}
            />
          }
        />
        <Route
          path="/offerlist"
          element={
            <OfferList
              search={search}
              setSearch={setSearch}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              agencyId={agencyId}
              setAgencyId={setAgencyId}
              agencyName={agencyName}
              setAgencyName={setAgencyName}
              selectedElem={selectedElem}
              setSelectedElem={setSelectedElem}
              rentalDuration={rentalDuration}
              setRentalDuration={setRentalDuration}
              totalAmount={totalAmount}
              setTotalAmount={setTotalAmount}
            />
          }
        />
        <Route
          path="/offerconfig"
          element={
            <OfferConfig
              search={search}
              setSearch={setSearch}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              agencyId={agencyId}
              setAgencyId={setAgencyId}
              agencyName={agencyName}
              setAgencyName={setAgencyName}
              selectedElem={selectedElem}
              setSelectedElem={setSelectedElem}
              rentalDuration={rentalDuration}
              setRentalDuration={setRentalDuration}
              totalAmount={totalAmount}
              setTotalAmount={setTotalAmount}
            />
          }
        />
        <Route
          path="/personnaldetails"
          element={
            <UserDetails
              search={search}
              setSearch={setSearch}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              agencyId={agencyId}
              setAgencyId={setAgencyId}
              agencyName={agencyName}
              setAgencyName={setAgencyName}
              selectedElem={selectedElem}
              setSelectedElem={setSelectedElem}
              rentalDuration={rentalDuration}
              setRentalDuration={setRentalDuration}
              totalAmount={totalAmount}
              setTotalAmount={setTotalAmount}
            />
          }
        />
        <Route
          path="/backoffice"
          element={
            <Backoffice
              backofficePassword={backofficePassword}
              password={password}
              setPassword={setPassword}
              isLogged={isLogged}
              setIsLogged={setIsLogged}
              storedPassword={storedPassword}
              setStoredPassword={setStoredPassword}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
