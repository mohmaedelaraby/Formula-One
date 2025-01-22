import React from 'react'; // Add this line
import { render, screen } from '@testing-library/react';
import Seasons from './Seasons';

describe('Seasons Component', () => {
  it('renders correctly', () => {
    render(<Seasons />);
    expect(screen.getByText('Seasons')).toBeInTheDocument();
  });
});