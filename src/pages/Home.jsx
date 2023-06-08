import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import Carrousel from "../components/Carroussel";

const Home = ({
  search,
  setSearch,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  agencyId,
  setAgencyId,
  agencyName,
  setAgencyName,
}) => {
  // Funct
  const handleSearch = (e) => {
    if (e.target.value.length > 3) {
      setShowSearch(true);
    }
    return setSearch(e.target.value);
  };
  let handleColor = (time) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };

  const navigate = useNavigate();

  // States
  const [data, setdata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const getLocations = async () => {
      try {
        const response = await axios.get(
          `https://site--c-chevalier-sixt--m4snx7ydrpgs.code.run/locations?q=${search}`
        );

        setdata(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    getLocations();
  }, [search]);

  return isLoading ? (
    <div className="container">
      <p>Loading ...</p>
    </div>
  ) : (
    <div className="container">
      <div>
        <div className="inputsBlock">
          <div className="inputsNavContainer">
            <div className="linkContainer">
              <span>VOITURES</span>
            </div>
          </div>
          <div className="inputsContainer">
            <div className="inputWrapper searchbar">
              <span className="inpuTitle">Retrait et retour</span>
              <input
                className="inputDiv"
                type="Searchbar-input"
                placeholder="Search..."
                onChange={handleSearch}
                value={search}
              />
            </div>
            <div className="inputWrapper">
              <span className="inpuTitle">Date de départ</span>
              <div className="dateTimeInputContainer">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat={"dd MMMM yyyy - HH:mm"}
                  showTimeSelect
                  timeClassName={(time) => handleColor(time)}
                  minTime={new Date(0, 0, 0, 8, 0)}
                  maxTime={new Date(0, 0, 0, 18, 0)}
                />
              </div>
            </div>
            <div className="inputWrapper">
              <div>
                <span className="inpuTitle">Date de retour</span>
              </div>
              <div className="dateTimeInputContainer">
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  dateFormat={"dd MMMM yyyy - HH:mm"}
                  showTimeSelect
                  timeClassName={handleColor}
                  minTime={new Date(0, 0, 0, 8, 0)}
                  maxTime={new Date(0, 0, 0, 18, 0)}
                />
              </div>
            </div>

            <button
              className={
                search && startDate && endDate
                  ? "activeSixtButton"
                  : "inactiveSixtButton"
              }
              disabled={search && startDate && endDate ? false : true}
              onClick={() => {
                navigate("/offerlist", {
                  state: {
                    startDate: startDate,
                    endDate: endDate,
                    agencyId: agencyId,
                    agencyName: agencyName,
                  },
                });
              }}
            >
              VOIR LES OFFRES
            </button>
          </div>
          {showSearch && (
            <div
              className="resultsContainer-root"
              onClick={() => {
                setShowSearch(false);
              }}
            >
              <div
                className="resultsContainer"
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                <p style={{ fontSize: 20 }}>Agences</p>
                {data.map((elem) => {
                  return (
                    <div
                      className="resultItem"
                      key={elem.id}
                      onClick={() => {
                        setSearch(elem.subtitle);
                        setShowSearch(false);
                        setAgencyId(elem.id);
                        setAgencyName(elem.subtitle);
                      }}
                    >
                      <span>{elem.subtitle}</span>;
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div className="homeCarrouselContainer">
          <Carrousel />
        </div>
      </div>
    </div>
  );
};

export default Home;
