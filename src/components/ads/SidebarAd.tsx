'use client';

import { useEffect, useRef } from 'react';

export default function SidebarAd() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      (window as any).atOptions = {
        key: '40e72ab8d30b37c0be7176a3fc189c18',
        format: 'iframe',
        height: 600,
        width: 160,
        params: {},
      };
      const script = document.createElement('script');
      script.src = 'https://www.highperformanceformat.com/40e72ab8d30b37c0be7176a3fc189c18/invoke.js';
      script.async = true;
      containerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className="hidden md:block" style={{ marginTop: 24, textAlign: 'center', overflow: 'hidden' }}>
      <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-1">Advertisement</p>
      <div ref={containerRef} />
    </div>
  );
}
