import React from 'react';
import './TimeTracker.scss';

const TimeTracker = ({ planets = [], vehicles = [] }) => {
  let totalTime = 0;

  planets.forEach((planet) => {
    vehicles.forEach((vehicle) => {
      if (vehicle.selected.includes(planet.selected)) {
        totalTime += planet.distance / vehicle.speed;
      }
    });
  });

  return (
    <div className="time-tracker">
      Total Time Taken: <span id="total-time">{totalTime}</span>
    </div>
  );
};

export default TimeTracker;
