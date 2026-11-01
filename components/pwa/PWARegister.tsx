'use client';

import React, { useEffect, useState } from 'react';
import { Wifi, WifiOff } from 'lucide-react';

export const PWARegister: React.FC = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    // Register Service Worker
    if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((reg) => {
            console.log('Imam ERP ServiceWorker registered:', reg.scope);
          })
          .catch((err) => {
            console.warn('ServiceWorker registration error:', err);
          });
      });
    }

    const updateOnlineStatus = () => {
      const online = navigator.onLine;
      setIsOnline(online);
      setShowStatus(true);
      if (online) {
        const timer = setTimeout(() => setShowStatus(false), 3000);
        return () => clearTimeout(timer);
      }
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  if (!showStatus && isOnline) return null;

  return (
    <div
      data-testid="offline-status-pill"
      className={`fixed top-3 right-4 z-50 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold shadow-md backdrop-blur transition-all ${
        isOnline
          ? 'bg-emerald-600/90 text-white'
          : 'bg-rose-600 text-white animate-pulse'
      }`}
    >
      {isOnline ? (
        <>
          <Wifi size={13} />
          <span>Synced Online</span>
        </>
      ) : (
        <>
          <WifiOff size={13} />
          <span>Offline Local Mode</span>
        </>
      )}
    </div>
  );
};
