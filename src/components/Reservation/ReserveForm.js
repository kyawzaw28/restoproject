import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import Modal from "../Modal/Modal";
import "../../styles/reservation.css";

function ReserveForm({ ...props }) {
  const [isFormVisible, setIsFormVisible] = useState(true);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    onClose,
    formState: { errors },
  } = useForm();
  const [formData, setFormData] = useState({
    id: uuidv4(),
    tableId: "",
    name: "",
    email: "",
    phone: "",
    capacity: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    if (props.tableData) {
      setFormData({
        ...formData,
        tableId: props.tableData.id,
        capacity: props.tableData.capacity,
      });
    }

    setValue("tableId", props.tableData.id);
    setValue("capacity", props.tableData.capacity);
  }, [props.tableData, setValue]);

  const today = new Date().toISOString().split("T")[0];

  const onSubmit = handleSubmit((data) => {
    props.submitFormData(data);
    const updatedTableData = { ...props.tableData, isReserved: true };
    props.updateTableData(updatedTableData);
    reset();
    props.onClose();
  });

  useEffect(() => {
    if (props.editData) {
      reset(props.editData);
    } else {
      reset({
        id: "",
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        tableId: props.tableData.id,
        capacity: props.tableData.capacity,
      });
    }
  }, [props.editData, reset]);

  //   console.log(formData);
  return (
    <div>
      <div className="table-info">
        <p>
          <strong>Table Number:</strong> {props.tableData?.id || "N/A"}
        </p>
        <p>
          <strong>Capacity:</strong> {props.tableData?.capacity || "N/A"}
        </p>
      </div>
      <form className="reservation-form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name:</label>
        <input {...register("name")} id="name" required />

        <label htmlFor="email">Email:</label>
        <input {...register("email")} id="email" type="email" required />

        <label htmlFor="phone">Phone:</label>
        <input {...register("phone")} id="phone" type="tel" required />

        <label htmlFor="date">Date:</label>
        <input
          {...register("date")}
          id="date"
          type="date"
          required
          min={today}
        />

        <label htmlFor="time">Time:</label>
        <input
          {...register("time")}
          id="time"
          type="time"
          required
          min="06:00"
          max="20:00"
        />

        <input type="hidden" {...register("id")} value={formData.id} />

        <button type="submit">Submit Reservation</button>
      </form>
    </div>
  );
}

export default ReserveForm;
