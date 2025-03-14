import { describe, it, expect } from 'vitest';
import { render, screen } from '@/tests/tools';
import { Spinner } from '.';

describe('Spinner Component', () => {
  it('renders the spinner with the default message', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toHaveTextContent('Loading...');
  });

  it('renders the spinner with a custom message', () => {
    render(<Spinner message="Fetching data..." />);
    expect(screen.getByRole('status')).toHaveTextContent(/fetching data.../i);
  });
});
