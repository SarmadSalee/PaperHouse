import { useEffect, useRef } from 'react';

export default function RectangleAd() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      (window as any).atOptions = {
        key: 'ad840e2bc5c78201b42fe7fa91f6cbab',
        format: 'iframe',
        height: 250,
        width: 300,
        params: {},
      };
      const script = document.createElement('script');
      script.src = 'https://www.highperformanceformat.com/ad840e2bc5c78201b42fe7fa91f6cbab/invoke.js';
      script.async = true;
      containerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className="flex items-center justify-center" style={{ overflow: 'hidden' }}>
      <div>
        <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-1 text-center">Advertisement</p>
        <div ref={containerRef} />
      </div>
    </div>
  );
}
