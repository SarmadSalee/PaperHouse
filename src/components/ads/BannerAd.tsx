'use client';

import { useEffect, useRef } from 'react';

export default function BannerAd() {
  const desktopRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Desktop ad (728x90)
    if (desktopRef.current) {
      (window as any).atOptions = {
        key: '7f0258eadaf6205b228faf8d4bfa8ac9',
        format: 'iframe',
        height: 90,
        width: 728,
        params: {},
      };
      const script = document.createElement('script');
      script.src = 'https://www.highperformanceformat.com/7f0258eadaf6205b228faf8d4bfa8ac9/invoke.js';
      script.async = true;
      desktopRef.current.appendChild(script);
    }

    // Mobile ad (320x50)
    if (mobileRef.current) {
      (window as any).atOptions = {
        key: '89782b8caabbdf85ba3103c5979172b5',
        format: 'iframe',
        height: 50,
        width: 320,
        params: {},
      };
      const script = document.createElement('script');
      script.src = 'https://www.highperformanceformat.com/89782b8caabbdf85ba3103c5979172b5/invoke.js';
      script.async = true;
      mobileRef.current.appendChild(script);
    }
  }, []);

  return (
    <div
      style={{
        textAlign: 'center',
        width: '100%',
        background: '#f9f9f9',
        // padding: '8px 0',
        borderBottom: '1px solid #eee',
        overflow: 'hidden',
      }}
      className="dark:bg-gray-800 dark:border-gray-700"
    >
      {/* <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-1">Advertisement</p> */}
      <div ref={desktopRef} className="hidden md:flex items-center justify-center" />
      <div ref={mobileRef} className="flex md:hidden items-center justify-center" />
    </div>
  );
}
