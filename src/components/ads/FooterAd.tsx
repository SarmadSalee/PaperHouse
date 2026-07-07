'use client';

import { useEffect, useRef } from 'react';

export default function FooterAd() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      (window as any).atOptions = {
        key: '2871220c6ebf0396c176aecd286ad487',
        format: 'iframe',
        height: 60,
        width: 468,
        params: {},
      };
      const script = document.createElement('script');
      script.src = 'https://www.highperformanceformat.com/2871220c6ebf0396c176aecd286ad487/invoke.js';
      script.async = true;
      containerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div
      className="hidden sm:flex items-center justify-center w-full bg-gray-50 dark:bg-gray-800"
      style={{ padding: '12px 0', overflow: 'hidden' }}
    >
      <div>
        <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-1 text-center">Advertisement</p>
        <div ref={containerRef} />
      </div>
    </div>
  );
}
