import React from 'react';
import renderer from 'react-test-renderer';
import DestinationCard from './DestinationCard.jsx';

describe('DestinationCard', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<DestinationCard />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
