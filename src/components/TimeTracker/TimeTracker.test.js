import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import TimeTracker from './TimeTracker.jsx';

describe('TimeTracker', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<TimeTracker />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calculates total time for one vehicle selected for one planet', () => {
    const mockData = {
      planets: [{ name: 'Donlon', selected: 'card-1', distance: 50 }],
      vehicles: [{ name: 'Space Pod', selected: ['card-1'], speed: 2 }],
    };

    const expectedTime =
      mockData.planets[0].distance / mockData.vehicles[0].speed;

    const { container } = render(<TimeTracker {...mockData} />);

    const timeElement = container.querySelector('#total-time');

    expect(parseInt(timeElement.innerHTML)).toEqual(expectedTime);
  });

  it('calculates total time for multiple vehicles and planets', () => {
    const mockData = {
      planets: [
        { name: 'Donlon', selected: 'card-1', distance: 50 },
        { name: 'Jebing', selected: 'card-2', distance: 100 },
      ],
      vehicles: [
        { name: 'Space Pod', selected: ['card-1'], speed: 2 },
        { name: 'Space Rocket', selected: ['card-2'], speed: 1 },
      ],
    };

    const expectedTime =
      mockData.planets[0].distance / mockData.vehicles[0].speed +
      mockData.planets[1].distance / mockData.vehicles[1].speed;

    const { container } = render(<TimeTracker {...mockData} />);

    const timeElement = container.querySelector('#total-time');

    expect(parseInt(timeElement.innerHTML)).toEqual(expectedTime);
  });

  it('calculates total time for multiple vehicles for 1 planets', () => {
    const mockData = {
      planets: [
        { name: 'Donlon', selected: 'card-1', distance: 50 },
        { name: 'Jebing', selected: 'card-2', distance: 100 },
      ],
      vehicles: [
        { name: 'Space Rocket', selected: ['card-2', 'card-1'], speed: 1 },
      ],
    };

    const expectedTime =
      mockData.planets[0].distance / mockData.vehicles[0].speed +
      mockData.planets[1].distance / mockData.vehicles[0].speed;

    const { container } = render(<TimeTracker {...mockData} />);

    const timeElement = container.querySelector('#total-time');

    expect(parseInt(timeElement.innerHTML)).toEqual(expectedTime);
  });

  it('calculates total time to be 0 if planet and vehicle are not selected', () => {
    const mockData = {
      planets: [{ name: 'Donlon', selected: false, distance: 50 }],
      vehicles: [{ name: 'Space Rocket', selected: [], speed: 1 }],
    };

    const expectedTime = 0;

    const { container } = render(<TimeTracker {...mockData} />);

    const timeElement = container.querySelector('#total-time');

    expect(parseInt(timeElement.innerHTML)).toEqual(expectedTime);
  });
});
