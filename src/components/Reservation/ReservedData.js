import React from "react";

function ReservedData({ data, ...props }) {
  const tableReservations = data.filter(
    (reservation) => reservation.tableId === props.tableData.id
  );

  return (
    <div>
      <h3>Reservation Details</h3>
      {tableReservations.length > 0 ? (
        tableReservations.map((data, index) => (
          <div key={index}>
            <p>Reserve ID: {data.id}</p>
            <p>Table Num: {data.tableId}</p>
            <p>Name: {data.name}</p>
            <p>Email: {data.email}</p>
            <p>Phone: {data.phone}</p>
            <p>Date: {data.date}</p>
            <p>Time: {data.time}</p>
            <p>Guests: {data.capacity}</p>
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
