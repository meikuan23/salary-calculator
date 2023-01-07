import { Routes, Route, Link } from "react-router-dom";
import CDCalc from "./CDCalc";
import WDCalc from "./WDCalc";
import "./App.css";
import background from "./background-payroll.jpg";

export default function App() {
  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
        width: "100vw",
        top: 0,
        left: 0,
        position: "relative",
      }}
    >
      <h1 className="font-color">Choose a Calculator Type</h1>
      <nav>
        <ul>
          <button className="button1">
            <Link to="/calendar-day">Calendar Day</Link>
          </button>
          <t />
          <button className="button1">
            <Link to="/working-day">Working Day</Link>
          </button>
        </ul>
      </nav>
      <Routes>
        <Route path="/calendar-day" element={<CDCalc />} />
        <Route path="/working-day" element={<WDCalc />} />
      </Routes>
    </div>
  );
}
