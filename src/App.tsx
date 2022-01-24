import React from 'react';
import './App.css';
import EventList from './components/EventList'
import Header from './partials/Header'
import Interests from './components/Interests';

function App() {
  return (
    <div className="App">
      <Header />
      <EventList />
	  <Interests />
    </div>
  );
}

export default App;
