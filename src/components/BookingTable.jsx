import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";

export default function BookingTable({ data }) {
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedRowDetails, setSelectedRowDetails] = useState(null);
  const [currentRows, setCurrentRows] = useState(data);

  const columns = [
    {
      field: "startDate",
      headerName: "Start Date",
      flex: 1,
      renderCell: (params) =>
        format(new Date(params.value), "dd-MM-yyyy - HH:mm"),
    },
    {
      field: "endDate",
      headerName: "End Date",
      flex: 1,
      renderCell: (params) =>
        format(new Date(params.value), "dd-MM-yyyy - HH:mm"),
    },
    { field: "bookingId", headerName: "Ref.", flex: 1 },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      renderCell: (params) => {
        const firstLetter = params.value[0].toUpperCase();
        const remainingLetters = params.value.slice(1);
        const firstNameCap = firstLetter + remainingLetters;
        return firstNameCap;
      },
    },
    {
      field: "lastName",
      headerName: "LastName",
      flex: 1,
      renderCell: (params) => params.value.toUpperCase(),
    },
    {
      field: "rentalDuration",
      headerName: "Duration",
      flex: 1,
      renderCell: (params) => `${params.value} jrs`,
    },
    { field: "totalAmount", headerName: "Price", flex: 1 },
    {
      field: "link",
      headerName: "Details",
      width: 100,
      renderCell: (params) => (
        <button onClick={() => handleDetailsButtonClick(params.row)}>
          Details
        </button>
      ),
    },
  ];

  const handleDetailsButtonClick = (row) => {
    setSelectedRowDetails(row);
    setIsVisible(true);
  };

  const delBooking = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/rentalconfigurations/delete`,
        { ids: rowSelectionModel }
      );

      console.log("Response", response.data);

      setCurrentRows((prevRows) =>
        prevRows.filter((row) => !rowSelectionModel.includes(row._id))
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {}, [rowSelectionModel]);

  const handleDeleteButtonClick = () => {
    console.log("hello deleted");
    console.log("rowSelectionModel", rowSelectionModel);
    delBooking();
  };

  return (
    <div>
      <div className="tableHeaderContainer">
        <div className="tableHeaderWrapper">
          <h1>Booking reservations</h1>
          <div>
            <button
              hidden={!rowSelectionModel.length}
              onClick={handleDeleteButtonClick}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <div style={{ height: "100%", width: "100%" }}>
        <DataGrid
          columns={columns}
          rows={currentRows}
          disableRowSelectionOnClick
          getRowId={(row) => row._id}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          columnHeaderHeight={30}
          rowHeight={40}
          pageSizeOptions={[0, 10]}
          checkboxSelection
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
          {...data}
        />
      </div>
      {isVisible && (
        <div
          className="modal-root"
          onClick={() => {
            setIsVisible(false);
          }}
        >
          <div
            className="modalContainer"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <div className="totalModalContainer">
              <h2 className="totalTitle">Details de la réservation</h2>
              <div className="totalBlock">
                <div className="mainInfoContainer">
                  <div className="mainInfoWrapper">
                    <p>Ref.: {selectedRowDetails.bookingId}</p>
                    <p>Véhicule: {selectedRowDetails.carType}</p>
                    <p>
                      Date de début:{" "}
                      {format(
                        new Date(selectedRowDetails.startDate),
                        "dd-MM-yy - HH:mm"
                      )}
                    </p>
                    <p>
                      Date de fin:{" "}
                      {format(
                        new Date(selectedRowDetails.endDate),
                        "dd-MM-yy - HH:mm"
                      )}
                    </p>
                    <p>Prénom: {selectedRowDetails.firstName}</p>
                    <p>Nom: {selectedRowDetails.lastName}</p>
                    <p>Email: {selectedRowDetails.email}</p>
                  </div>
                  <div className="smallCarImgContainer">
                    <img src={`${selectedRowDetails.imageURL}`} alt="" />
                  </div>
                </div>

                <p className="totalSubtitle">Période de location</p>
                <div className="billLine">
                  <span className="lineText">
                    {`Durée de la location ( ${selectedRowDetails.rentalDuration} jours x ${selectedRowDetails.prices.dayPrice.amount})
                    `}
                  </span>
                  <span>
                    €{" "}
                    {(
                      selectedRowDetails.rentalDuration *
                      selectedRowDetails.prices.dayPrice.amount
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="totalBlock">
                <p className="totalSubtitle">Protection et Options</p>
                {selectedRowDetails.cart.map((elem) => {
                  return (
                    <div key={elem.title} className="billLine">
                      <span className="lineText">{elem.title}</span>
                      <span>
                        €{" "}
                        {(elem.price.unit === "jour"
                          ? elem.price.amount *
                            selectedRowDetails.rentalDuration
                          : elem.price.amount
                        ).toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="totalBlock">
                <p className="totalSubtitle">Frais</p>
                {selectedRowDetails.extraFees.map((elem, index) => {
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
                    <span>{selectedRowDetails.totalAmount}</span>
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
}
