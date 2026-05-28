const NAV_ITEMS = [
  { id: 'dashboard', label: 'Bosh',   icon: '🏠' },
  { id: 'shop',      label: "Do'kon", icon: '🛒' },
  { id: 'stats',     label: 'Natija', icon: '📊' },
];

export default function BottomNav({ active, onChange }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 px-4 pb-4">
      <div className="max-w-md mx-auto glass-bright rounded-3xl p-2 flex items-center justify-around">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className={`btn-press flex-1 flex flex-col items-center gap-1 py-2 px-3 rounded-2xl transition-all
              ${active === item.id ? 'nav-active' : 'hover:bg-white/5'}`}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className={`text-xs font-bold ${active === item.id ? 'text-yellow-400' : 'text-white/50'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
