import React from 'react';
import './App.css';
import EventList from './components/EventList'
import Header from './partials/Header'
import Interests from './components/Interests';
// import CreateEvent from './components/createAndEdit/CreateEvent';

function App() {
  return (
    <div className="App">
      <Header />
      {/* <CreateEvent /> */}
	    <Interests />
      <EventList />
    </div>
  );
}

export default App;
