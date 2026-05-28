import { useEffect } from 'react';

export default function Toast({ message, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 animate-toastIn pointer-events-none">
      <div className="glass-bright px-6 py-3 rounded-2xl text-white font-bold text-sm shadow-2xl flex items-center gap-2 whitespace-nowrap">
        {message}
      </div>
    </div>
  );
}
