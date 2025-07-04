import React, { useState } from 'react';
import './App.css';
import TimeChart from './components/TimeChart'; // Dashboard chart
import WebAct from './components/WebAct'; // Web activity section

function App() {
  // State for showing the popup and dashboard
  const [viewDashboard, setViewDashboard] = useState(false);
  const [showPopup, setShowPopup] = useState(true); // Popup is visible by default

  // Function to handle the "Start" button click in the popup
  const handleStart = () => {
    setShowPopup(false); // Hide popup
    setViewDashboard(true); // Show the dashboard
  };

  return (
    <div className="container">
      {/* Popup */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Welcome to Productivity Tracker</h2>
            <p>Click Start to begin tracking your productivity.</p>
            <button onClick={handleStart}>Start</button>
          </div>
        </div>
      )}

      {/* Dashboard (Visible after clicking "Start") */}
      {viewDashboard && (
        <>
          <h1>Productivity Tracker</h1>
          <TimeChart />
          <WebAct />
        </>
      )}
    </div>
  );
}

export default App;

