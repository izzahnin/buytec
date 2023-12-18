'use client';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className='w-screen custom-height flex '>
    <div className="max-w-lg h-fit mx-auto mt-8 p-4 bg-red-200 rounded shadow-md">
      <h2 className="text-2xl font-bold text-red-800 mb-4">Something went wrong!</h2>
      <p className="text-red-600 mb-4">{error.message}</p>
      <button
        onClick={() => reset()}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        Try again
      </button>
    </div>
    </main>
  );
}
