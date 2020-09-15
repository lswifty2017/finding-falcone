import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DestinationCard from './DestinationCard.jsx';

describe('DestinationCard', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<DestinationCard />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders all planets as options in select element', async () => {
    const planets = [
      { name: 'Planet 1', selected: false, distance: 300 },
      { name: 'Planet 2', selected: false, distance: 400 },
    ];

    const { container } = render(
      <DestinationCard title="card-1" planets={planets} />
    );

    const selectControl = container.querySelector('.select__control');

    const selectOptions = container.querySelectorAll('.select__option');
    // expect(selectOptions).toHaveLength(planets.length);
  });

  test.todo(
    'renders vehicle options depending on planet distance on planet select'
  );

  test.todo('fires functions for both vehicles and planets on select if given');
});
