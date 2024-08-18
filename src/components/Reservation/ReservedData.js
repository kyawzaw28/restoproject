import React from "react";
import "../../styles/reservation.css";

function ReservedData({ data, ...props }) {
  const tableReservations = data.filter(
    (reservation) => reservation.tableId === props.tableData.id
  );

  return (
    <div className="reservation-detail">
      <h3>Reservation Information</h3>
      {tableReservations.length > 0 ? (
        tableReservations.map((data, index) => (
          <div key={index}>
            <div className="detail-section">
              <label>Reserve ID:</label>
              <span>{data.id}</span>
            </div>
            <div className="detail-section">
              <label>Table Num:</label>
              <span>{data.tableId}</span>
            </div>
            <div className="detail-section">
              <label>Name:</label>
              <span>{data.name}</span>
            </div>
            <div className="detail-section">
              <label>Email:</label>
              <span>{data.email}</span>
            </div>
            <div className="detail-section">
              <label>Phone:</label>
              <span>{data.phone}</span>
            </div>
            <div className="detail-section">
              <label>Date:</label>
              <span>{data.date}</span>
            </div>
            <div className="detail-section">
              <label>Guest:</label>
              <span>{data.capacity}</span>
            </div>
            <div className="detail-section">
              <label>Time:</label>
              <span>{data.time}</span>
            </div>
          </div>
        ))
      ) : (
        <p>No reservations for this table.</p>
      )}
      <button onClick={props.onEdit}>Edit</button>
    </div>
  );
}

export default ReservedData;
