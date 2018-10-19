import React from 'react';

import './Spinner.css';

const Spinner = () => (
  <div id="circle">
    <div className="loader">
      <div className="loader">
        <div className="loader">
          <div className="loader" />
        </div>
      </div>
    </div>
  </div>
);

export default Spinner;
