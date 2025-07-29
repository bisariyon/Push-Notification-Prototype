'use client'

import { useEffect } from 'react'
import { initPushNotifications } from '@/lib/firebasePush'
import { Capacitor } from '@capacitor/core';


export const PushClient = () => {

  useEffect(() => {
    if (Capacitor.getPlatform() === 'android') {
      initPushNotifications();
    }
  }, []);

  return null
}
