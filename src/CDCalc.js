import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import background from "./background-payroll.jpg";

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

  // To get the calendar day of the given month
  let startDay = new Date(startRef.current?.value).getDate();
  let endDay = new Date(endRef.current?.value).getDate();

  const calendarDay = () => {
    const date = new Date(startRef.current?.value);
    const month = date.getMonth();
    const year = date.getFullYear();
    const numDays = new Date(year, month + 1, 0).getDate();
    return numDays;
  };

  let monthlySalary = payRef.current?.value;

  let proratedSalary = parseFloat(
    ((endDay - startDay + 1) / calendarDay()) * monthlySalary
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
    <div className="App">
      <h2 className="font-color">
        Salary Will be Calculated Based on Calendar Days
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
