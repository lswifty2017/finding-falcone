import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import DestinationCard from './DestinationCard.jsx';

describe('DestinationCard', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<DestinationCard />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test.todo('renders all planets as options in select element');

  test.todo(
    'renders vehicle options depending on planet distance on planet select'
  );

  test.todo('fires functions for both vehicles and planets on select if given');
});
