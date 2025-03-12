import { describe, it, expect, vi } from 'vitest';
import { Pagination } from '../Pagination';
import { render, screen, fireEvent } from '@/tests/tools';

describe('Pagination Component', () => {
  const onPageChangeMock = vi.fn();

  it('displays current page number', () => {
    render(<Pagination currentPage={3} totalPages={10} onPageChange={onPageChangeMock} />);
    expect(screen.getByText('Page 3 of 10')).toBeInTheDocument();
  });

  it('disables previous button when current page is 1', () => {
    render(<Pagination currentPage={1} totalPages={10} onPageChange={onPageChangeMock} />);
    expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled();
  });

  it('disables next button when current page is the last page', () => {
    render(<Pagination currentPage={10} totalPages={10} onPageChange={onPageChangeMock} />);
    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
  });

  it('calls onPageChange with previous page when previous button is clicked', () => {
    render(<Pagination currentPage={5} totalPages={10} onPageChange={onPageChangeMock} />);
    fireEvent.click(screen.getByRole('button', { name: /previous/i }));

    expect(onPageChangeMock).toHaveBeenCalledWith(4);
  });

  it('calls onPageChange with next page when next button is clicked', () => {
    render(<Pagination currentPage={5} totalPages={10} onPageChange={onPageChangeMock} />);
    fireEvent.click(screen.getByRole('button', { name: /next/i }));

    expect(onPageChangeMock).toHaveBeenCalledWith(6);
  });
});
