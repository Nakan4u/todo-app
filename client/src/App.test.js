import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app with correct title', () => {
  render(<App />);
  const titleElement = screen.getByText(/TODO list app/i);
  expect(titleElement).toBeInTheDocument();
});
