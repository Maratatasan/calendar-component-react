import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

import Calendar from "./calendar/Calendar";
import { useCalendar } from "./calendar/useCalendar";

function App() {

  return (
    <div className="App">
      <Calendar date={"2021-01-07"}></Calendar>
    </div>
  );
}

export default App;

