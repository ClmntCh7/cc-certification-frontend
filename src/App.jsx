import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

// Pages
import Home from "./pages/Home";
import OfferList from "./pages/OfferList";
import OfferConfig from "./pages/OfferConfig";
import UserDetails from "./pages/UserDetails";
import Backoffice from "./pages/Backoffice";

// Components
import Header from "./components/Header";

const App = () => {
  // const [search, setSearch] = useState(() => {
  //   const storedSearch = localStorage.getItem("search");
  //   return storedSearch ? JSON.parse(storedSearch) : [];
  // });
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [agencyId, setAgencyId] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [selectedElem, setSelectedElem] = useState();
  const [rentalDuration, setRentalDuration] = useState(1);

  return (
    <Router>
      <Header />
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
            />
          }
        />
        <Route path="/backoffice" element={<Backoffice />} />
      </Routes>

      {/* <Modal /> */}
    </Router>
  );
};

export default App;
