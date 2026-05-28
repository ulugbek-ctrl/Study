import SubjectTimer from '../components/SubjectTimer.jsx';
import XpBar        from '../components/XpBar.jsx';
import { SUBJECTS } from '../utils/constants.js';
import { getLevel, getLevelName } from '../utils/helpers.js';

export default function Dashboard({ stats, onComplete }) {
  const { coins, xp, streak, completed } = stats;
  const now   = new Date();
  const h     = now.getHours();
  const today = now.toDateString();

  return (
    <div className="space-y-4 animate-slideUp">
      {/* Hero card */}
      <div className="glass rounded-3xl p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-white/50 text-sm font-semibold">Salom, aka! 👋</p>
            <h1 className="text-3xl text-white mt-0.5" style={{ fontFamily: "'Fredoka One', cursive" }}>
              Sardor's Zone
            </h1>
            <p className="text-white/40 text-xs mt-1">Bugun ham yaxshi o'qi, bro 💪</p>
          </div>
          <div className="text-center">
            <div className="text-4xl animate-firePulse">🔥</div>
            <p className="text-orange-400 font-black text-lg leading-none">{streak}</p>
            <p className="text-white/40 text-[10px]">streak</p>
          </div>
        </div>
        <XpBar xp={xp} />
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="glass rounded-2xl p-4 flex items-center gap-3">
          <span className="text-3xl animate-coinBounce">🪙</span>
          <div>
            <p className="text-white/50 text-xs">Tangalar</p>
            <p className="text-yellow-400 text-2xl font-black" style={{ fontFamily: "'Fredoka One', cursive" }}>
              {coins}
            </p>
          </div>
        </div>
        <div className="glass rounded-2xl p-4 flex items-center gap-3">
          <span className="text-3xl">⚡</span>
          <div>
            <p className="text-white/50 text-xs">Daraja</p>
            <p className="text-purple-400 text-2xl font-black" style={{ fontFamily: "'Fredoka One', cursive" }}>
              {getLevel(xp)}
            </p>
          </div>
        </div>
      </div>

      {/* Subject cards */}
      {SUBJECTS.map(sub => {
        const isActive  = h >= sub.start && h < sub.end;
        const isDone    = completed[`${today}_${sub.id}`] || false;
        const isPast    = h >= sub.end;

        return (
          <div
            key={sub.id}
            className={`glass rounded-3xl p-5 transition-all ${isActive ? 'ring-1 ring-yellow-400/40' : ''}`}
            style={{
              background: `linear-gradient(135deg, ${sub.gradientFrom}, ${sub.gradientTo})`,
              borderColor: sub.borderColor,
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{sub.emoji}</span>
                  {isActive && (
                    <span className="px-2 py-0.5 bg-green-500/25 text-green-400 text-[10px] font-bold rounded-full">
                      🟢 Hozir dars!
                    </span>
                  )}
                  {isDone && (
                    <span className="px-2 py-0.5 bg-white/10 text-white/50 text-[10px] font-bold rounded-full">
                      ✅ Bajarildi
                    </span>
                  )}
                </div>
                <h3 className="text-white text-xl font-black mt-1" style={{ fontFamily: "'Fredoka One', cursive" }}>
                  {sub.name}
                </h3>
                <p className="text-white/40 text-xs">{sub.start}:00 – {sub.end}:00</p>
              </div>
              <SubjectTimer subject={sub} />
            </div>

            <button
              onClick={() => onComplete(sub)}
              disabled={isDone || isPast}
              className={`btn-press w-full py-3 rounded-2xl font-black text-sm transition-all
                ${isDone || isPast
                  ? 'bg-white/10 text-white/30 cursor-not-allowed'
                  : 'text-gray-900 shadow-lg hover:scale-[1.02] hover:shadow-yellow-500/30'
                }`}
              style={!(isDone || isPast) ? {
                background: 'linear-gradient(135deg, #fbbf24, #f97316)'
              } : {}}
            >
              {isDone
                ? 'Bajarildi ✓'
                : isPast
                  ? 'Vaqt o\'tib ketdi ⏰'
                  : `✅ ${sub.name} tugallandi! +25 🪙 +50 XP`
              }
            </button>
          </div>
        );
      })}
    </div>
  );
}
