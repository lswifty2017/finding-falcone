import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import cloneDeep from 'lodash/cloneDeep';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import DestinationCard from './components/DestinationCard/DestinationCard';
import TimeTracker from './components/TimeTracker/TimeTracker';
import Button from './components/Button/Button';
import findFalconeApi from './api/findFalconeApi';
import './App.scss';

const App = () => {
  const [vehicles, setVehicles] = useState([]);
  const [planets, setPlanets] = useState([]);

  const [vehiclesSelected, setVehiclesSelected] = useState([]);
  const [planetsSelected, setPlanetsSelected] = useState([]);

  const [missionResult, setMissionResult] = useState('false');

  const routerHistory = useHistory();

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
        vehicle['total_selected'] = 0;
        vehicle['selected'] = [];
        return vehicle;
      });

      setVehicles(vehiclesData);
    })();
  }, []);

  const planetsOnSelect = ({ planetSelected, cardSelected }) => {
    const planetsSelected = [];

    const updatedPlanetsState = cloneDeep(planets).map((planet) => {
      if (planet.selected === cardSelected) {
        planet.selected = false;
      }

      if (planet.name === planetSelected) {
        planet.selected = cardSelected;
      }
      return planet;
    });

    setPlanets(updatedPlanetsState);

    updatedPlanetsState.forEach(({ name, selected }) => {
      if (selected) {
        planetsSelected.push(name);
      }
    });

    setPlanetsSelected(planetsSelected);
  };

  const vehiclesOnSelect = ({
    vehicleSelected,
    previousVehicleSelected,
    cardSelected,
  }) => {
    const selectedVehicles = [];

    const updatedVehiclesState = cloneDeep(vehicles).map((vehicle) => {
      if (vehicle.name === vehicleSelected) {
        vehicle.total_no -= 1;
        vehicle.total_selected += 1;
        vehicle.selected.push(cardSelected);
      }

      if (vehicle.name === previousVehicleSelected) {
        vehicle.total_no += 1;
        vehicle.total_selected -= 1;
        vehicle.selected = vehicle.selected.filter(
          (selected) => selected !== cardSelected
        );
      }
      return vehicle;
    });

    setVehicles(updatedVehiclesState);

    updatedVehiclesState.forEach(({ name, total_selected }) => {
      for (let i = 0; i < total_selected; i++) {
        selectedVehicles.push(name);
      }
    });

    setVehiclesSelected(selectedVehicles);
  };

  const searchForFalcone = async () => {
    const { status } = await findFalconeApi({
      path: 'find',
      requestType: 'POST',
      requestBody: {
        vehicles_names: vehiclesSelected,
        planet_names: planetsSelected,
      },
    });

    setMissionResult(status);
    routerHistory.push('/result');
  };

  // Create 4 destination cards
  for (let i = 0; i < 4; i++) {
    desinationCardsJsx.push(
      <DestinationCard
        key={i}
        planets={planets}
        planetsOnSelect={planetsOnSelect}
        vehicles={vehicles}
        vehiclesOnSelect={vehiclesOnSelect}
        title={`Destination ${i + 1}`}
      />
    );
  }

  return (
    <div className="app">
      <Header />
      <div className="app__container">
        <Switch>
          <Route path="/result">
            <h1>Mission Result</h1>
            <div className="app__result">
              {missionResult === 'success' ? (
                <h2>The mission to find Falcone was successful!</h2>
              ) : (
                <h2>You have failed to find Falcone.</h2>
              )}
            </div>
          </Route>
          <Route path="/">
            <h1>Finding Falcone</h1>
            <p>Select which planets you want to search for Al Falcone.</p>
            <div className="app__destinations">{desinationCardsJsx}</div>
            <TimeTracker planets={planets} vehicles={vehicles} />
            <div className="app__buttons">
              <Button
                text="Search for Falcone"
                bgColor="green"
                onClick={searchForFalcone}
                disabled={
                  planetsSelected.length !== 4 || vehiclesSelected.length !== 4
                    ? true
                    : false
                }
              />
            </div>
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default App;
