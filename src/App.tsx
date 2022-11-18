import React from 'react';
import logo from './logo.svg';
import './App.css';

import Calendar from './calendar/Calendar';

function App() {
  return (
    <div className="App">
<Calendar date={'2023-11-07'}></Calendar>
    </div>
  );
}

export default App;
