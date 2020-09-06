import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import DestinationCard from './components/DestinationCard/DestinationCard';
import findFalconeApi from './api/findFalconeApi';
import './App.scss';

const App = () => {
  const [vehicles, setVehicles] = useState([]);
  const [planets, setPlanets] = useState([]);

  const desinationCardsJsx = [];

  useEffect(() => {
    (async () => {
      const planetsData = await findFalconeApi({
        path: 'planets',
        requestType: 'GET',
      });

      planetsData.map((planet) => {
        planet['selected'] = false;
        return planet;
      });

      setPlanets(planetsData);

      const vehiclesData = await findFalconeApi({
        path: 'vehicles',
        requestType: 'GET',
      });

      vehiclesData.map((vehicle) => {
        vehicle['selected'] = 0;
        return vehicle;
      });

      setVehicles(vehiclesData);
    })();
  }, []);

  const planetsOnSelect = (planetSelected, cardSelected) => {
    const updatedPlanetsState = planets.map((planet) => {
      if (planet.selected === cardSelected) {
        planet.selected = false;
      }

      if (planet.name === planetSelected) {
        planet.selected = cardSelected;
      }
      return planet;
    });

    setPlanets(updatedPlanetsState);
  };

  for (let i = 0; i < 4; i++) {
    desinationCardsJsx.push(
      <DestinationCard
        key={i}
        planets={planets}
        planetsOnSelect={planetsOnSelect}
        title={`Destination ${i + 1}`}
      />
    );
  }

  return (
    <div className="app">
      <Header />
      <div className="app__container">
        <h1>Finding Falcone</h1>
        <p>Select which planets you want to search for Al Falcone.</p>
        <div className="app__destinations">{desinationCardsJsx}</div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
