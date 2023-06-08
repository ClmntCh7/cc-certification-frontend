import { useEffect, useState } from "react";
import axios from "axios";
import "../assets/styles/OfferList.css";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { Autocomplete, TextField } from "@mui/material";

const OfferList = ({
  search,
  startDate,
  endDate,
  agencyId,
  agencyName,
  selectedElem,
  setSelectedElem,
  rentalDuration,
  setRentalDuration,
}) => {
  const [data, setdata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [images, setImages] = useState();
  const [carCategories, setCarCategories] = useState();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const navigate = useNavigate();

  const formatDate = (date) => {
    if (date instanceof Date) {
      return format(date, "yyyy-MM-dd'T'HH:mm:ss");
    } else {
      console.log("date n'est pas une date");
    }
  };

  const calcTotalAmount = (amount) => {
    const msDiff = Math.abs(endDate - startDate);
    const diffInDays = Math.ceil(msDiff / (1000 * 60 * 60 * 24));
    return (diffInDays * amount).toFixed(2);
  };

  const findSelectedCar = (id) => {
    console.log("id", id);
    const foundCar = data.find((car) => car.id === id);
    setSelectedElem(foundCar);
  };

  const getImages = async () => {
    try {
      const response = await axios.post(
        `https://site--c-chevalier-sixt--m4snx7ydrpgs.code.run/rentalconfigurations/create`,
        { offerId: selectedElem.id }
      );

      setImages(response.data.splashImages);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const carCategories = data.map((value) => value.carGroupInfo.bodyStyle);
    setCarCategories([...new Set(carCategories)]);
  }, [data]);

  useEffect(() => {
    const getLocations = async () => {
      try {
        const response = await axios.get(
          `https://site--c-chevalier-sixt--m4snx7ydrpgs.code.run/rentaloffers?pickupStation=${agencyId}&returnStation=${agencyId}&pickupDate=${formatDate(
            startDate
          )}&returnDate=${formatDate(endDate)}`
        );
        const duration = Math.ceil(
          Math.abs(endDate - startDate) / (1000 * 60 * 60 * 24)
        );

        setRentalDuration(duration);
        setdata(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    getLocations();
  }, [endDate, agencyId, startDate, setRentalDuration, selectedCategory]);

  const filterDataByCategory = (category) => {
    if (category) {
      const filteredData = data.filter(
        (elem) => elem.carGroupInfo.bodyStyle === category
      );
      console.log("ici");
      return filteredData;
    } else {
      return data;
    }
  };

  const handleCategoryChange = (event, value) => {
    setSelectedCategory(value);
  };

  return isLoading ? (
    <div className="container">
      <p>Loading ...</p>
    </div>
  ) : (
    <>
      <div className="container">
        <div className="inputsBlock">
          <div className="inputsContainer">
            <div className="inputWrapper">
              <span className="inpuTitle">Retrait et retour</span>
              <p className="whiteText">{search}</p>
            </div>
            <div className="inputDateWrapper">
              <span className="inpuTitle">Date de départ</span>
              <div className="dateTimeInputContainer">
                <div className="dateInputContainer">
                  <p className="whiteText">{formatDate(startDate)}</p>
                </div>
              </div>
            </div>
            <div className="inputDateWrapper">
              <span className="inpuTitle">Date de retour</span>
              <div className="dateTimeInputContainer">
                <div className="dateInputContainer">
                  <p className="whiteText">{formatDate(endDate)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section>
          <div className="filterContainer">
            <div>
              <span style={{ fontWeight: "bold", fontSize: 18 }}>
                {data.length}
              </span>
              <span> Offres</span>
            </div>
            <Autocomplete
              options={carCategories}
              sx={{ width: 300 }}
              value={selectedCategory}
              onChange={handleCategoryChange}
              renderInput={(params) => (
                <TextField {...params} label="Catégorie de véhicules" />
              )}
            />
          </div>

          <div className="offerListContainer">
            {filterDataByCategory(selectedCategory).map((elem) => {
              return (
                <div key={elem.id} className="offerCard">
                  <div className="cardTitle">
                    <span>{elem.headlines.description}</span>
                  </div>
                  <div>
                    <span>{elem.headlines.shortSubline}</span>
                  </div>
                  <div
                    className="carImgContainer"
                    onClick={() => {
                      setIsVisible(true);
                      getImages();
                      findSelectedCar(elem.id);
                    }}
                  >
                    <img
                      className="carImage"
                      src={`${elem.images.small}`}
                      alt=""
                    />
                  </div>
                  <div>
                    <span>{elem.headlines.mileageInfo}</span>
                  </div>
                  <div>
                    <span style={{ color: "white" }}>
                      {`${elem.prices.currency} `}
                      <span
                        style={{ fontSize: 20 }}
                      >{`${elem.prices.dayPrice.amount}`}</span>{" "}
                      jour
                    </span>
                  </div>
                  <div>
                    <span>{`${elem.prices.currency} ${calcTotalAmount(
                      elem.prices.dayPrice.amount
                    )} total`}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* modal */}
      {isVisible && (
        <div
          className="carDetailsModal-root"
          onClick={() => {
            setIsVisible(false);
          }}
        >
          <div
            className="carDetailsModal"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <div
              className="carDetailsContainer"
              style={images && { backgroundImage: `url(${images[0]})` }}
            >
              <p style={{ color: "white", fontSize: 20 }}>
                {selectedElem.headlines.longSubline}
              </p>
              <div className="carDetailsWrapper">
                <div>
                  <span>{selectedElem.carGroupInfo.maxPassengers}</span>
                </div>
                <div>
                  <span>{selectedElem.carGroupInfo.doors}</span>
                </div>
                <div>
                  <span>
                    {selectedElem.carGroupInfo.automatic
                      ? "Automatique"
                      : "Manuelle"}
                  </span>
                </div>
                <div>
                  <span>{selectedElem.carGroupInfo.bagage}</span>
                </div>
                {selectedElem.carGroupInfo.airCondition ? (
                  <div>
                    <span>Climatisation</span>
                  </div>
                ) : (
                  ""
                )}
                <div>
                  <span>{selectedElem.carGroupInfo.driverMinAge} ans</span>
                </div>
              </div>
            </div>
            <div className="modalRightContainer">
              <div className="totalPriceContainer">
                <span>TOTAL</span>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span>{`${selectedElem.prices.currency} ${calcTotalAmount(
                    selectedElem.prices.dayPrice.amount
                  )}`}</span>
                  <span style={{ fontSize: 10, textAlign: "right" }}>
                    Taxes incluses
                  </span>
                </div>
              </div>
              <button
                className="activeSixtButton"
                onClick={() => {
                  navigate("/offerconfig", {
                    state: {
                      selectedElem: selectedElem,
                      totalPrice: calcTotalAmount(
                        selectedElem.prices.dayPrice.amount
                      ),
                      duration: rentalDuration,
                      agencyId: agencyId,
                      agencyName: agencyName,
                      startDate: startDate,
                      endDate: endDate,
                    },
                  });
                }}
              >
                Sélectionner
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OfferList;
