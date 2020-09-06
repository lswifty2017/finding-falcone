import React, { useState } from 'react';
import Select from 'react-select';
import cloneDeep from 'lodash/cloneDeep';
import './DestinationCard.scss';

const DestinationCard = ({ planets = [], planetsOnSelect, title = '' }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const selectOptions = cloneDeep(planets);

  selectOptions.map((option) => {
    const { name, selected } = option;

    option.label = name;
    option.disabled = false;

    debugger;

    if (selected !== false && selected !== title) {
      option.disabled = true;
    }
  });

  return (
    <div className="destination-card">
      <div className="destination-card__title">{title}</div>
      <Select
        className="basic-single"
        defaultValue={selectedOption}
        options={selectOptions}
        onChange={({ name }) => {
          setSelectedOption(name);
          planetsOnSelect(name, title);
        }}
        isOptionDisabled={(option) => option.disabled}
      ></Select>
    </div>
  );
};

export default DestinationCard;
