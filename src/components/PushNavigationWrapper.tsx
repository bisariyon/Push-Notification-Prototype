'use client';

import { usePushNavigation } from '@/lib/usePushNavigation';

export const PushNavigationWrapper = ({ children }: { children: React.ReactNode }) => {
  usePushNavigation();
  return <>{children}</>;
};
