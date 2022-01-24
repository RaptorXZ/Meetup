import React from 'react';
import './App.css';
import EventList from './components/EventList'
import Interests from './components/Interests';

function App() {
  return (
    <div className="App">
      <EventList />
	  <Interests />
    </div>
  );
}

export default App;
