import StatCard from '../components/StatCard.jsx';
import { WEEK_LABELS, SUBJECTS } from '../utils/constants.js';
import { getLevel, getLevelProgress, getLevelName } from '../utils/helpers.js';

export default function Stats({ stats }) {
  const { coins, xp, streak, history = {}, purchases = [] } = stats;
  const level    = getLevel(xp);
  const lvlProg  = getLevelProgress(xp);
  const today    = new Date().getDay();

  // Build 7-day bar data starting from "today - 6" to "today"
  const bars = Array.from({ length: 7 }, (_, i) => {
    const dayIdx = (today - 6 + i + 7) % 7;
    return {
      label:   WEEK_LABELS[dayIdx],
      val:     history[dayIdx] || 0,
      isToday: i === 6,
    };
  });
  const maxVal = Math.max(...bars.map(b => b.val), 1);

  // Trend: last 3 days vs first 3 days of week
  const first3 = bars.slice(0, 3).reduce((a, b) => a + b.val, 0);
  const last3  = bars.slice(4).reduce((a, b) => a + b.val, 0);
  const trend  = last3 >= first3 ? 'up' : 'down';

  return (
    <div className="space-y-4 animate-slideUp">
      {/* Header */}
      <div className="glass rounded-3xl p-5">
        <h2 className="text-2xl text-white" style={{ fontFamily: "'Fredoka One', cursive" }}>
          📊 Statistika
        </h2>
        <p className="text-white/50 text-sm mt-1">Qanday ketayapsan, ko'r!</p>
      </div>

      {/* Trend banner */}
      <div
        className={`rounded-2xl p-4 flex items-center gap-3 border ${
          trend === 'up'
            ? 'bg-green-500/10 border-green-500/25'
            : 'bg-red-500/10 border-red-500/25'
        }`}
      >
        <span className="text-3xl">{trend === 'up' ? '📈' : '📉'}</span>
        <div>
          <p className="text-white font-black text-sm">
            {trend === 'up' ? "Zo'r ketayapsan, bro! 🔥" : 'Yana harakat qil, uka! 💪'}
          </p>
          <p className="text-white/50 text-xs">
            trend === 'up' ? 'Trend yuqoriga' : 'Trend pastga — yuk'al!'
          </p>
        </div>
      </div>

      {/* Stat cards 2x2 */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard icon="⚡" label="Jami XP"   value={xp}            color="text-purple-400" />
        <StatCard icon="🔥" label="Streak"    value={`${streak} kun`} color="text-orange-400" />
        <StatCard icon="🪙" label="Tangalar"  value={coins}          color="text-yellow-400" />
        <StatCard icon="🏆" label="Daraja"    value={`${level} — ${getLevelName(xp)}`} color="text-green-400" />
      </div>

      {/* Weekly XP bar chart */}
      <div className="glass rounded-3xl p-5">
        <h3 className="text-white font-bold text-sm mb-4">📅 Haftalik XP</h3>
        <div className="flex items-end gap-1.5" style={{ height: '88px' }}>
          {bars.map((bar, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex items-end justify-center" style={{ height: '72px' }}>
                <div
                  className="w-full rounded-t-lg transition-all duration-700"
                  style={{
                    height: `${Math.max((bar.val / maxVal) * 72, 3)}px`,
                    background: bar.isToday
                      ? 'linear-gradient(180deg, #fbbf24, #f97316)'
                      : 'linear-gradient(180deg, rgba(96,165,250,0.5), rgba(96,165,250,0.25))',
                  }}
                />
              </div>
              <span className={`text-[10px] font-bold ${bar.isToday ? 'text-yellow-400' : 'text-white/35'}`}>
                {bar.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Level progress */}
      <div className="glass rounded-3xl p-5 space-y-4">
        <h3 className="text-white font-bold text-sm">🏆 Daraja progressi</h3>

        {/* Overall level bar */}
        <div>
          <div className="flex justify-between text-xs text-white/50 mb-1.5">
            <span>Daraja {level}</span>
            <span>{Math.round(lvlProg * 100)}%</span>
          </div>
          <div className="h-3 bg-white/10 rounded-full xp-bar-wrap">
            <div
              className="h-full rounded-full bar-fill"
              style={{
                width: `${Math.round(lvlProg * 100)}%`,
                background: 'linear-gradient(90deg, #fbbf24, #f97316)',
              }}
            />
          </div>
        </div>

        {/* Per-subject bars */}
        {SUBJECTS.map(sub => {
          // Progress based on completed count (rough estimate from history)
          const daysDone = Object.keys(history)
            .filter(k => (history[k] || 0) > 0).length;
          const pct = Math.min(Math.round((daysDone / 7) * 100), 100);
          return (
            <div key={sub.id}>
              <div className="flex justify-between text-xs text-white/50 mb-1.5">
                <span>{sub.emoji} {sub.name}</span>
                <span>{pct}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bar-fill"
                  style={{
                    width: `${pct}%`,
                    background: `linear-gradient(90deg, #34d399, #10b981)`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent purchases */}
      {purchases.length > 0 && (
        <div className="glass rounded-3xl p-5">
          <h3 className="text-white font-bold text-sm mb-3">🛍 So'nggi xaridlar</h3>
          <div className="space-y-2">
            {purchases.slice(0, 5).map((p, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/5 rounded-xl px-3 py-2">
                <span className="text-xl">{p.emoji}</span>
                <div className="flex-1">
                  <p className="text-white text-xs font-bold">{p.name}</p>
                  <p className="text-white/40 text-[10px]">{new Date(p.boughtAt).toLocaleDateString('uz')}</p>
                </div>
                <span className="text-yellow-400 text-xs font-bold">-{p.cost} 🪙</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
