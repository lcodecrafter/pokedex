import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  disablePrevious?: boolean;
  disableNext?: boolean;
  showPageInfo?: boolean;
  currentPage?: number;
  totalPages?: number;
  className?: string;
}

export function Navigation({
  onPrevious,
  onNext,
  disablePrevious = false,
  disableNext = false,
  showPageInfo = false,
  currentPage,
  totalPages,
  className,
}: NavigationProps) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <button
        onClick={onPrevious}
        disabled={disablePrevious}
        className="p-2 rounded-lg cursor-pointer hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent disabled:cursor-not-allowed"
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      {showPageInfo && currentPage && totalPages && (
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
      )}
      <button
        onClick={onNext}
        disabled={disableNext}
        className="p-2 rounded-lg cursor-pointer hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent disabled:cursor-not-allowed"
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
