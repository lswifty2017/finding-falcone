import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import findFalconeApi from './api/findFalconeApi';
import './App.scss';

const App = () => {
  const [vehicles, setVehicles] = useState([]);
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    (async () => {
      setPlanets(await findFalconeApi({ path: 'planets', requestType: 'GET' }));
      setVehicles(
        await findFalconeApi({ path: 'vehicles', requestType: 'GET' })
      );

      const mockData = {
        planet_names: ['Donlon', 'Enchai', 'Pingasor', 'Sapir'],
        vehicle_names: [
          'Space pod',
          'Space rocket',
          'Space rocket',
          'Space rocket',
        ],
      };

      const testAPIPost = await findFalconeApi({
        path: 'find',
        requestType: 'POST',
        requestBody: mockData,
      });

      console.log(testAPIPost);
    })();
  }, []);

  return (
    <div className="app">
      <Header />
      <div className="app__container">
        <h1>Finding Falcone</h1>
        <p>Select which planets you want to search for Al Falcone.</p>
        {planets.map(({ name }, i) => {
          return <div key={i}>{name}</div>;
        })}
        {vehicles.map(({ name }, i) => {
          return <div key={i}>{name}</div>;
        })}
      </div>
      <Footer />
    </div>
  );
};

export default App;
