'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function TokenPage() {
  const [token, setToken] = useState('');
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fcmToken = localStorage.getItem('fcmToken');
    console.log('🔔 FCM Token from localStorage:', fcmToken);
    setToken(fcmToken || '');
  }, []);

  const handleCopy = () => {
    if (!token) return;
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-indigo-100 px-4">
      <div className="p-6 bg-white shadow-xl rounded-xl max-w-lg w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">📲 Current FCM Token</h1>

        <p className="break-all bg-gray-100 p-3 rounded text-sm text-gray-700 mb-4">
          {token || 'No token found'}
        </p>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Go to Home
          </button>

          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-md bg-green-600 text-white font-medium hover:bg-green-700 transition"
          >
            {copied ? '✅ Copied!' : 'Copy Token'}
          </button>
        </div>
      </div>
    </main>
  );
}
