import React from 'react';
import './App.css';
import EventList from './components/EventList'
import Header from './partials/Header'
import Interests from './components/Interests';
import {useState} from "react"
// import CreateEvent from './components/createAndEdit/CreateEvent';

function App() {
	const [userInterests, setUserInterests] = useState<string[]>([])
  return (
    <div className="App">
      <Header />
	    <Interests userInterests={userInterests} setUserInterests={setUserInterests}/>
      <EventList userInterests={userInterests}/>
    </div>
  );
}

export default App;
