import { getLevel, getLevelProgress, getLevelName } from '../utils/helpers.js';
import { LEVEL_XP, LEVEL_NAMES } from '../utils/constants.js';

export default function XpBar({ xp }) {
  const level    = getLevel(xp);
  const progress = getLevelProgress(xp);
  const pct      = Math.round(progress * 100);
  const nextXp   = LEVEL_XP[Math.min(level + 1, LEVEL_XP.length - 1)];

  return (
    <div className="mt-4">
      <div className="flex justify-between text-xs text-white/50 mb-1.5 font-semibold">
        <span>Daraja {level} — {getLevelName(xp)}</span>
        <span>{xp} / {nextXp} XP</span>
      </div>
      <div className="h-3 bg-white/10 rounded-full xp-bar-wrap">
        <div
          className="h-full rounded-full bar-fill"
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(90deg, #fbbf24, #f97316)',
          }}
        />
      </div>
      <p className="text-white/30 text-[10px] mt-1 text-right">
        Keyingi daraja: {LEVEL_NAMES[Math.min(level + 1, LEVEL_NAMES.length - 1)]}
      </p>
    </div>
  );
}
