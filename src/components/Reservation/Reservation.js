import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import Modal from "../Modal/Modal";
import "../../styles/reservation.css";
import ReserveForm from "./ReserveForm";
import ReservedData from "./ReservedData";

function Reservation({ isOpen, ...props }) {
  const [editData, setEditData] = useState(null);
  const [reservedData, setReservedData] = useState([]);
  const handleReservationSubmit = (data) => {
    console.log(data, "data");
    if (editData) {
      setReservedData(
        reservedData.map((reservation) =>
          reservation.tableId === data.tableId ? data : reservation
        )
      );
      setEditData(null);
    } else {
      setReservedData((prevData) => [...prevData, data]);
    }
  };
  //   console.log(props.tableData);

  const handleEditReservation = () => {
    const tableReservation = reservedData.find(
      (reservation) => reservation.tableId === props.tableData.id
    );
    setEditData(tableReservation);
    props.tableData.isReserved = false;
  };

  return (
    <Modal isOpen={isOpen} onClose={props.onClose}>
      {!props.tableData.isReserved ? (
        <ReserveForm
          tableData={props.tableData}
          submitFormData={handleReservationSubmit}
          updateTableData={props.updateTableData}
          editData={editData}
          onClose={props.onClose}
        />
      ) : (
        <ReservedData
          data={reservedData}
          tableData={props.tableData}
          onEdit={handleEditReservation}
        />
      )}
    </Modal>
  );
}

export default Reservation;
