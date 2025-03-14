import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@/tests/tools';
import { Navigation } from '../Navigation';

describe('Navigation Component', () => {
  it('calls onPrevious when clicking the Previous button', () => {
    const onPreviousMock = vi.fn();
    render(<Navigation onPrevious={onPreviousMock} onNext={vi.fn()} />);

    const prevButton = screen.getByRole('button', { name: /previous/i });
    fireEvent.click(prevButton);

    expect(onPreviousMock).toHaveBeenCalled();
  });

  it('calls onNext when clicking the Next button', () => {
    const onNextMock = vi.fn();
    render(<Navigation onPrevious={vi.fn()} onNext={onNextMock} />);

    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);

    expect(onNextMock).toHaveBeenCalled();
  });

  it('disables Previous button when disablePrevious is true', () => {
    render(<Navigation onPrevious={vi.fn()} onNext={vi.fn()} disablePrevious />);

    const prevButton = screen.getByRole('button', { name: /previous/i });
    expect(prevButton).toBeDisabled();
  });

  it('disables Next button when disableNext is true', () => {
    render(<Navigation onPrevious={vi.fn()} onNext={vi.fn()} disableNext />);

    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).toBeDisabled();
  });

  it('shows page info when showPageInfo is true', () => {
    render(
      <Navigation
        onPrevious={vi.fn()}
        onNext={vi.fn()}
        showPageInfo
        currentPage={3}
        totalPages={10}
      />,
    );

    expect(screen.getByText('Page 3 of 10')).toBeInTheDocument();
  });

  it('does not show page info when showPageInfo is false', () => {
    render(<Navigation onPrevious={vi.fn()} onNext={vi.fn()} showPageInfo={false} />);

    expect(screen.queryByText(/Page \d+ of \d+/)).not.toBeInTheDocument();
  });
});
