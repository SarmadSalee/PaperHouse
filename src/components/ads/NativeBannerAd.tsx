'use client';

import { useEffect, useRef } from 'react';

export default function NativeBannerAd() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const script = document.createElement('script');
      script.src = 'https://pl29539365.effectivecpmnetwork.com/851f4449ef07528950c9f32239d7e48e/invoke.js';
      script.async = true;
      containerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div
      style={{
        width: '100%',
        padding: '16px 0',
        borderTop: '1px solid #eee',
        borderBottom: '1px solid #eee',
        overflow: 'hidden',
      }}
      className="dark:border-gray-700"
    >
      <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-1 text-center">Advertisement</p>
      <div id="container-851f4449ef07528950c9f32239d7e48e" ref={containerRef} />
    </div>
  );
}
