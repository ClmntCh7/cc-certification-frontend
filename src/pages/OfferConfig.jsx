import { useEffect, useState } from "react";
import axios from "axios";
import "../assets/styles/OfferConfig.css";
import { useLocation, useNavigate } from "react-router-dom";

const OfferConfig = ({
  selectedElem,
  agencyId,
  agencyName,
  startDate,
  endDate,
  rentalDuration,
  totalAmount,
  setTotalAmount,
}) => {
  const location = useLocation();

  const [data, setdata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [total, setTotal] = useState(location.state.totalPrice);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const { id, images, headlines, carGroupInfo, prices } = selectedElem;
  const { additionalCharges, extraFees, includedCharges, splashImages } = data;

  useEffect(() => {
    const getLocations = async () => {
      try {
        const response = await axios.post(
          `https://site--c-chevalier-sixt--m4snx7ydrpgs.code.run/rentalconfigurations/create`,
          { offerId: id }
        );

        setdata(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    getLocations();
  }, [id]);

  const handleFinalTotal = () => {
    let finalTotal = prices.dayPrice.amount * rentalDuration;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].price.unit === "jour") {
        finalTotal += cart[i].price.amount * rentalDuration;
      } else {
        finalTotal += cart[i].price.amount;
      }
    }
    for (let i = 0; i < extraFees.length; i++) {
      finalTotal += extraFees[i].price.amount;
    }
    // console.log(finalTotal);
    return finalTotal.toFixed(2);
  };

  const handleAddOptions = (elem) => {
    const updatedCart = [...cart];
    updatedCart.push(elem);
    setCart(updatedCart);
    const optionPrice = Number(elem.price.amount);

    if (elem.price.unit === "jour") {
      setTotal(Number(total) + optionPrice * rentalDuration);
    } else {
      setTotal(Number(total) + optionPrice);
    }
  };

  const removeOption = (elem) => {
    const updatedCart = cart.filter((item) => item.id !== elem.id);
    setCart(updatedCart);
    if (elem.price.unit === "jour") {
      setTotal(total - Number(elem.price.amount) * rentalDuration);
    } else {
      setTotal(total - Number(elem.price.amount));
    }
  };

  const handleOptionSelection = (elem) => {
    return cart.find((i) => i.id === elem.id);
  };

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <div className="container">
      <div
        className="heroContainer"
        style={{
          backgroundImage: `url(${splashImages[0]})`,
          backgroundPositionY: -120,
          backgroundSize: "cover",
        }}
      >
        <p className="carTitle">{headlines.description}</p>
      </div>
      <div className="heroSubBar">
        <div>
          <span>{headlines.longSubline}</span>
        </div>
        <div className="carDetailsWrapper">
          <div>
            <span>{carGroupInfo.maxPassengers} sieges</span>
          </div>
          <div>
            <span>{carGroupInfo.doors} portes</span>
          </div>
          <div>
            <span>{carGroupInfo.automatic ? "Automatique" : "Manuelle"}</span>
          </div>
          <div>
            <span>{carGroupInfo.bagage}</span>
          </div>
          {carGroupInfo.airCondition ? (
            <div>
              <span>Climatisation</span>
            </div>
          ) : (
            ""
          )}
          <div>
            <span>{carGroupInfo.driverMinAge} ans</span>
          </div>
        </div>
      </div>
      <section className="optionsContainer">
        <div className="leftContainer">
          <p className="titleConfig">
            Choisissez votre protection et vos options
          </p>
          <div className="offerOptions">
            <p>Votre offe inclut</p>
            <div className="includedChargesContainer">
              {includedCharges.map((elem) => {
                return (
                  <div key={elem.title} className="includedCharges">
                    {elem.title}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="offerOptions">
            <p>Choisissez vos options</p>
            <div className="includedChargesContainer">
              {additionalCharges.map((elem) => {
                const isSelected = handleOptionSelection(elem);
                return (
                  <div
                    key={elem.id}
                    className={`includedChargesWrapper ${
                      isSelected ? "whiteBlockColor" : "blackBlockColor"
                    }`}
                    onClick={() => {
                      isSelected ? removeOption(elem) : handleAddOptions(elem);
                    }}
                  >
                    <div>
                      <p className="includedChargesTitle">{elem.title}</p>
                      <p className="includedChargesDescr">{elem.description}</p>
                    </div>
                    <p className="includedChargesPrice">
                      € {elem.price.amount} {elem.price.unit}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="rightContainer">
          <div className="rightWraper">
            <div className="priceBlock">
              <span
                style={{ color: "black", fontWeight: "bold", fontSize: 12 }}
              >
                TOTAL
              </span>
              <span
                style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
              >
                € {handleFinalTotal()}
              </span>
            </div>
            <div className="subtitleBlock">
              <span
                style={{ color: "white" }}
                onClick={() => {
                  setIsVisible(true);
                }}
              >
                Détail du prix
              </span>
              <span style={{ color: "white" }}>Taxes incluses</span>
            </div>
            <div className="buttonContainerContinue">
              <button
                className="activeSixtButtonwhite"
                onClick={() => {
                  setTotalAmount(() => handleFinalTotal());
                  navigate("/personnaldetails", {
                    state: {
                      includedCharges: includedCharges,
                      extraFees: extraFees,
                      cart: cart,
                      images: images,
                    },
                  });
                }}
              >
                Continuer
              </button>
            </div>
          </div>
        </div>
      </section>
      {isVisible && (
        <div
          className="totalModal-root"
          onClick={() => {
            setIsVisible(false);
          }}
        >
          <div
            className="totalModal"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <div className="totalModalContainer">
              <p className="totalTitle">Details du prix</p>
              <div className="totalBlock">
                <p className="totalSubtitle">Période de location</p>
                <div className="billLine">
                  <span className="lineText">
                    {`Durée de la location ( ${rentalDuration} jours x ${
                      prices.currency
                    } 
                    ${prices.dayPrice.amount.toFixed(2)})`}
                  </span>
                  <span>
                    € {(rentalDuration * prices.dayPrice.amount).toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="totalBlock">
                <p className="totalSubtitle">Protection et Options</p>
                {cart.map((elem) => {
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
              <div className="totalBlock">
                <p className="totalSubtitle">Frais</p>
                {extraFees.map((elem, index) => {
                  return (
                    <div key={elem.index} className="billLine">
                      <span className="lineText">{elem.title}</span>
                      <span>€ {elem.price.amount.toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>
              <div className="totalAmountBlock">
                <p className="totalSubtitle">Total</p>
                <div className="billLine">
                  <div className="totalAmount">
                    <span>€ {handleFinalTotal()} </span>
                    <span className="lineText">Taxe incluses</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfferConfig;
