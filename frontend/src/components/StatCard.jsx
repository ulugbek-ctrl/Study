export default function StatCard({ icon, label, value, color = 'text-white' }) {
  return (
    <div className="glass rounded-2xl p-4 animate-popIn">
      <span className="text-2xl">{icon}</span>
      <p className={`font-fredoka text-xl mt-1 ${color}`} style={{ fontFamily: "'Fredoka One', cursive" }}>
        {value}
      </p>
      <p className="text-white/50 text-xs mt-0.5">{label}</p>
    </div>
  );
}
