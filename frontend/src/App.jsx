import { useState, useCallback } from 'react';
import BottomNav  from './components/BottomNav.jsx';
import Toast      from './components/Toast.jsx';
import Dashboard  from './pages/Dashboard.jsx';
import Shop       from './pages/Shop.jsx';
import Stats      from './pages/Stats.jsx';
import { useStats } from './hooks/useStats.js';

/* Floating star decoration */
const STARS = Array.from({ length: 14 }, (_, i) => ({
  top:   `${Math.floor(Math.sin(i * 73) * 50 + 50)}%`,
  left:  `${Math.floor(Math.cos(i * 53) * 50 + 50)}%`,
  size:  `${8 + (i % 5)}px`,
  delay: `${(i * 0.4).toFixed(1)}s`,
}));

export default function App() {
  const [tab, setTab]     = useState('dashboard');
  const [toast, setToast] = useState(null);
  const { stats, loading, error, completeLesson, buyReward } = useStats();

  const showToast = useCallback(msg => setToast(msg), []);

  const handleComplete = useCallback(async (subject) => {
    try {
      const result = await completeLesson(subject.id);
      showToast(`🎉 ${subject.name} tugallandi! +${result.gained.coins} 🪙  +${result.gained.xp} XP`);
    } catch (e) {
      showToast(`ℹ️ ${e.message}`);
    }
  }, [completeLesson, showToast]);

  const handleBuy = useCallback(async (reward) => {
    try {
      await buyReward(reward);
      showToast(`${reward.emoji} ${reward.name} olindi! Enjoy!`);
    } catch (e) {
      showToast(`😅 ${e.message}`);
    }
  }, [buyReward, showToast]);

  if (loading) {
    return (
      <div className="bg-mesh min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-firePulse">🚀</div>
          <p className="text-white/60 text-sm">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-mesh min-h-screen flex items-center justify-center px-6">
        <div className="glass rounded-3xl p-8 text-center max-w-sm">
          <div className="text-5xl mb-4">😅</div>
          <h2 className="text-white font-black text-lg mb-2">Backend ishlamayapti</h2>
          <p className="text-white/50 text-sm mb-4">
            Backend serverni ishga tushir:<br/>
            <code className="text-yellow-400 text-xs">cd backend && npm install && npm run dev</code>
          </p>
          <p className="text-white/30 text-xs">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-mesh min-h-screen relative">
      {/* Twinkle stars */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {STARS.map((s, i) => (
          <div
            key={i}
            className="absolute text-yellow-200/20 animate-twinkle"
            style={{ top: s.top, left: s.left, fontSize: s.size, animationDelay: s.delay }}
          >★</div>
        ))}
      </div>

      {/* Toast */}
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}

      {/* Page content */}
      <main className="relative z-10 max-w-md mx-auto px-4 pt-6 pb-32">
        {tab === 'dashboard' && (
          <Dashboard stats={stats} onComplete={handleComplete} />
        )}
        {tab === 'shop' && (
          <Shop stats={stats} onBuy={handleBuy} />
        )}
        {tab === 'stats' && (
          <Stats stats={stats} />
        )}
      </main>

      <BottomNav active={tab} onChange={setTab} />
    </div>
  );
}
