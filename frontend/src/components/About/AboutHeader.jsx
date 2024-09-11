import React from 'react';
import './AboutHeader.css';
import Button from '../Button/Button';
// import 'bootstrap/dist/css/bootstrap.min.css'; 

const AboutHeader = () => {
  return (
    <div className="About-Head d-flex flex-column justify-content-center align-items-center">
      <div className="about-content text-center">
        <h1>About Us</h1>
      </div>
      {/* <Button /> */}
    </div>
  );
};

export default AboutHeader;
