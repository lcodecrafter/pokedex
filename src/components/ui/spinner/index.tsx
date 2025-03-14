import { LoaderCircle } from 'lucide-react';

interface SpinnerProps {
  message?: string;
}

export function Spinner({ message = 'Loading...' }: SpinnerProps) {
  return (
    <div className="flex items-center justify-center min-h-screen" role="status">
      <LoaderCircle className="w-8 h-8 animate-spin" aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
}
