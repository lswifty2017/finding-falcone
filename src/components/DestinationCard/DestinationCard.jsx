import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import cloneDeep from 'lodash/cloneDeep';
import './DestinationCard.scss';

const DestinationCard = ({
  planets = [],
  planetsOnSelect,
  vehicles = [],
  vehiclesOnSelect,
  title = '',
}) => {
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [vehicleOptions, setVehicleOptions] = useState([]);

  const planetOptions = cloneDeep(planets);
  // let vehicleOptions = cloneDeep(vehicles);

  let previousVehicleSelected = '';

  planetOptions.map((option) => {
    const { name, selected } = option;

    option.label = name;
    option.disabled = false;

    if (selected !== false && selected !== title) {
      option.disabled = true;
    }
  });

  vehicleOptions.map((option) => {
    const { name, total_no } = option;

    option.label = `${name} (${total_no})`;

    if (total_no === 0) {
      option.disabled = true;
    }
  });

  const filterVehiclesByPlanet = (planet, distance) => {
    const filteredOptions = cloneDeep(vehicles).filter(
      (vehicle) => vehicle.max_distance <= distance
    );

    setVehicleOptions(filteredOptions);
  };

  return (
    <div className="destination-card">
      <div className="destination-card__destination">
        <div className="destination-card__title">{title}</div>
        <Select
          defaultValue={selectedPlanet}
          options={planetOptions}
          onChange={({ name, distance }) => {
            filterVehiclesByPlanet(name, distance);
            setSelectedPlanet(name);
            planetsOnSelect({ planetSelected: name, title: title });
          }}
          isOptionDisabled={(option) => option.disabled}
        ></Select>
      </div>
      <div className="destination__transport">
        <div className="destination-card__title">Select Transport</div>
        <Select
          defaultValue={selectedVehicle}
          options={vehicleOptions}
          onChange={({ name }) => {
            previousVehicleSelected = cloneDeep(selectedVehicle);
            setSelectedVehicle(name);
            vehiclesOnSelect({
              vehicleSelected: name,
              previousVehicleSelected: previousVehicleSelected,
            });
          }}
          isOptionDisabled={(option) => option.disabled}
        ></Select>
      </div>
    </div>
  );
};

export default DestinationCard;
