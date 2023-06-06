import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

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
          `http://localhost:3000/locations?q=${search}`
        );

        console.log("DATA", response.data);

        setdata(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    getLocations();
  }, [search]);

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <div className="container">
      <div className="inputsBlock">
        <div className="inputsNavContainer">
          <div>
            <span>VOITURES</span>
          </div>
        </div>
        <div className="inputsContainer">
          <div className="inputWrapper">
            <span className="inpuTitle">Retrait et retour</span>
            <input
              type="Searchbar-input"
              placeholder="Search..."
              onChange={handleSearch}
              value={search}
            />
          </div>
          <div className="inputWrapper">
            <span className="inpuTitle">Date de départ</span>
            <div className="dateTimeInputContainer">
              <div className="dateInputContainer">
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
          </div>
          <div className="inputWrapper">
            <span className="inpuTitle">Date de retour</span>
            <div className="dateTimeInputContainer">
              <div className="dateInputContainer">
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
          </div>

          <div>
            <button
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
        </div>
      </div>

      {/* Modals */}
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
  );
};

export default Home;
