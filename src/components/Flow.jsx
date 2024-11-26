import React from 'react';

const Flow = ({ data }) => {
  return (
    <div className="flow">
      {Object.entries(data).map(([key, value], index) => (
        <div key={index} className="flow-item">
          <strong>{key}:</strong> {value}
        </div>
      ))}
    </div>
  );
};

export default Flow;