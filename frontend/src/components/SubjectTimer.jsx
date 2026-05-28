import { useTimer } from '../hooks/useTimer.js';
import { formatTime } from '../utils/helpers.js';

const SIZE   = 148;
const STROKE = 9;
const R      = (SIZE - STROKE * 2) / 2;
const CIRC   = 2 * Math.PI * R;

export default function SubjectTimer({ subject }) {
  const now      = useTimer();
  const totalSec = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
  const startSec = subject.start * 3600;
  const endSec   = subject.end   * 3600;
  const duration = (subject.end - subject.start) * 3600;

  let label, remaining, progress;

  if (totalSec < startSec) {
    remaining = startSec - totalSec;
    label     = 'Boshlanishiga';
    progress  = 0;
  } else if (totalSec < endSec) {
    remaining = endSec - totalSec;
    label     = 'Qoldi';
    progress  = (totalSec - startSec) / duration;
  } else {
    remaining = 0;
    label     = 'Tugadi ✅';
    progress  = 1;
  }

  const offset = CIRC * (1 - progress);

  return (
    <svg width={SIZE} height={SIZE} className="flex-shrink-0">
      {/* Track */}
      <circle
        cx={SIZE / 2} cy={SIZE / 2} r={R}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={STROKE}
      />
      {/* Progress arc */}
      <circle
        cx={SIZE / 2} cy={SIZE / 2} r={R}
        fill="none"
        stroke={subject.color}
        strokeWidth={STROKE}
        strokeDasharray={CIRC}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{
          transformOrigin: 'center',
          transform: 'rotate(-90deg)',
          transition: 'stroke-dashoffset 1s linear',
          filter: `drop-shadow(0 0 6px ${subject.color})`,
        }}
      />
      {/* Time text */}
      <text
        x="50%" y="44%"
        dominantBaseline="middle" textAnchor="middle"
        fill="white" fontSize="24" fontWeight="800" fontFamily="Fredoka One"
      >
        {remaining > 0 ? formatTime(remaining) : '00:00'}
      </text>
      <text
        x="50%" y="65%"
        dominantBaseline="middle" textAnchor="middle"
        fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="Nunito"
      >
        {label}
      </text>
    </svg>
  );
}
