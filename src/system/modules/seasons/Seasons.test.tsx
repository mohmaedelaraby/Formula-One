import { render, screen } from '@testing-library/react';
import Seasons from './Seasons';

test('renders MyComponent', () => {
  render(<Seasons />);
  const linkElement = screen.getByText(/hello/i);
  expect(linkElement).toBeInTheDocument();
});
