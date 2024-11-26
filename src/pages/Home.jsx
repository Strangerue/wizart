import React, { useState } from 'react';

function HomePage() {
  const [visitors, setVisitors] = useState(0);
  const [leads, setLeads] = useState(0);
  const [processedLeads, setProcessedLeads] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [conversion, setConversion] = useState(0);
  const [denies, setDenies] = useState(0);

  return (
    <div>
      <div>
        <ul className="stat-and-date-row">
          <li className="stat-and-date header"><h2>Statistics</h2></li>
          <li className="stat-and-date date">Date</li>
        </ul>
        <ul className="card-row">
          <li className="card-column">
            <div className="card-text">Visits</div>
            <div className="card-content">{visitors}</div>
          </li>
          <li className="card-column">
            <div className="card-text">Leads</div>
            <div className="card-content">{leads}</div>
          </li>
          <li className="card-column">
            <div className="card-text">Processed leads</div>
            <div className="card-content">{processedLeads}</div>
          </li>
          <li className="card-column">
            <div className="card-text">Clicks</div>
            <div className="card-content">{clicks}</div>
          </li>
          <li className="card-column">
            <div className="card-text">Conversion</div>
            <div className="card-content">{conversion}</div>
          </li>
          <li className="card-column">
            <div className="card-text">Denies</div>
            <div className="card-content">{denies}</div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HomePage;