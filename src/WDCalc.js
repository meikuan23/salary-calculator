import React, { useState, useRef } from "react";
import "./App.css";
// import background from "./background-payroll.jpg";

export default function App() {
  const [dateState, setDateState] = useState(new Date());
  const startRef = useRef();
  const endRef = useRef();
  const payRef = useRef();
  const [result, setResult] = useState();
  const [formData, setFormData] = useState({
    startRef: "",
    endRef: "",
    payRef: "",
  });

  let startDate = new Date(startRef.current?.value);
  let endDate = new Date(endRef.current?.value);

  // Get the total number of working days between the start and end dates
  const weekdays = [];
  let currentDate = startDate;
  while (currentDate <= endDate) {
    if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
      weekdays.push(currentDate);
    }
    currentDate = new Date(currentDate.getTime());
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Get the total working days from the given month
  const firstDay = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
  const lastDay = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0);

  const workingDays = [];
  currentDate = firstDay;
  while (currentDate <= lastDay) {
    if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
      workingDays.push(currentDate);
    }
    currentDate = new Date(currentDate.getTime());
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Convert the working days from array to number, and calculate the prorated salary
  let monthlySalary = payRef.current?.value;
  const numWeekDays = parseInt(weekdays.length);
  const numworkingDaysInMonth = parseInt(workingDays.length);

  let proratedSalary = parseFloat(
    (numWeekDays / numworkingDaysInMonth) * monthlySalary
  ).toFixed(2);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!startRef.current?.value || !endRef.current?.value) {
      alert("Please enter a date");
    } else {
      setResult(proratedSalary);
    }
    const checkMonth = () => {
      const startMonth = new Date(startRef.current?.value).getMonth();
      const endMonth = new Date(endRef.current?.value).getMonth();
      if (endMonth !== startMonth) {
        alert("The month for Start Date and End Date must be the same!");
      } else {
      }
    };
    checkMonth();
  };

  return (
    <div className="App background">
      <h2 className="font-color">
        Salary Will be Calculated Based on Working Days
      </h2>
      <p className="font-color">
        {" "}
        Today Date:
        {dateState.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
        })}
      </p>
      <p className="font-color">
        Time:
        {dateState.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })}
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Start Date:{" "}
          <input
            ref={startRef}
            className="label"
            type="date"
            onChange={(event) => setFormData({ ...formData })}
          ></input>
        </label>
        <br />
        <label>
          End Date:{" "}
          <input
            ref={endRef}
            className="label"
            type="date"
            onChange={(event) => setFormData({ ...formData })}
          ></input>
        </label>
        <br />
        <label>
          Monthly Salary:{" "}
          <input
            ref={payRef}
            className="label"
            type="number"
            onChange={(event) => setFormData({ ...formData })}
          ></input>
        </label>
        <br />
        <button className="button" type="submit" onClick={handleSubmit}>
          Calculate!
        </button>
      </form>
      <p className="result">Result: {result} </p>
    </div>
  );
}
