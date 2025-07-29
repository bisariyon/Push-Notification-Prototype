'use client';

import { useEffect } from 'react';
import { initPushNotifications } from "@/lib/firebasePush";
import { useRouter } from 'next/navigation';
import { usePushNavigation } from '@/lib/usePushNavigation';


export default function Home() {
  const router = useRouter();
  usePushNavigation();

  useEffect(() => {
    initPushNotifications((fcmToken) => {
      console.log("🔔 FCM Token received:", fcmToken);
      localStorage.setItem('fcmToken', fcmToken);
    });
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 to-white px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">📬 Hello Push!</h1>

      <div className="flex flex-col space-y-4 w-full max-w-xs mt-5">
        <button
          onClick={() => router.push('/dashboard')}
          className="px-6 py-3 rounded-2xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
        >
          Dashboard
        </button>

        <button
          onClick={() => router.push('/xray')}
          className="px-6 py-3 rounded-2xl bg-green-600 text-white font-semibold hover:bg-green-700 transition"
        >
          X-Ray
        </button>

        <button
          onClick={() => router.push('/funds')}
          className="px-6 py-3 rounded-2xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
        >
          Funds
        </button>

        <button
          onClick={() => router.push('/token')}
          className="px-6 py-3 rounded-2xl bg-gray-600 text-white font-semibold hover:bg-gray-700 transition"
        >
          View Token
        </button>
      </div>
    </main>
  );
}
