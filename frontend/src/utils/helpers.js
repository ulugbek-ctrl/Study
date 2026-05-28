import { LEVEL_XP, LEVEL_NAMES } from './constants.js';

export function getLevel(xp) {
  let lvl = 0;
  for (let i = LEVEL_XP.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_XP[i]) { lvl = i; break; }
  }
  return Math.min(lvl, LEVEL_XP.length - 1);
}

export function getLevelProgress(xp) {
  const lvl = getLevel(xp);
  if (lvl >= LEVEL_XP.length - 1) return 1;
  const curr = LEVEL_XP[lvl];
  const next = LEVEL_XP[lvl + 1];
  return (xp - curr) / (next - curr);
}

export function getLevelName(xp) {
  return LEVEL_NAMES[getLevel(xp)];
}

export function formatTime(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}
