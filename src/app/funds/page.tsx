'use client';

import { useRouter } from 'next/navigation';

export default function FundsPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">💰 List of Funds</h1>

      <button
        onClick={() => router.push('/')}
        className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
      >
        Go to Home
      </button>
    </main>
  );
}
