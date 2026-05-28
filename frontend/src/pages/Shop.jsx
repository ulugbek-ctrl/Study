import { useState } from 'react';
import { REWARDS, SHOP_CATEGORIES } from '../utils/constants.js';

export default function Shop({ stats, onBuy }) {
  const { coins } = stats;
  const [cat, setCat] = useState('all');

  const filtered = cat === 'all' ? REWARDS : REWARDS.filter(r => r.category === cat);

  return (
    <div className="space-y-4 animate-slideUp">
      {/* Header */}
      <div className="glass rounded-3xl p-5">
        <h2 className="text-2xl text-white" style={{ fontFamily: "'Fredoka One', cursive" }}>
          🏪 Mukofot Do'koni
        </h2>
        <p className="text-white/50 text-sm mt-1">Tangalarni sarfla, xursand bo'l!</p>
        <div className="flex items-center gap-2 mt-3">
          <span className="text-2xl animate-coinBounce">🪙</span>
          <span className="text-yellow-400 text-2xl font-black" style={{ fontFamily: "'Fredoka One', cursive" }}>
            {coins}
          </span>
          <span className="text-white/40 text-sm">tanga mavjud</span>
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {SHOP_CATEGORIES.map(c => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all
              ${cat === c.id
                ? 'bg-yellow-400 text-gray-900'
                : 'glass text-white/60 hover:text-white'
              }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Rewards grid */}
      <div className="grid grid-cols-2 gap-3">
        {filtered.map(reward => {
          const canBuy = coins >= reward.cost;
          return (
            <div
              key={reward.id}
              className={`reward-card glass rounded-2xl p-4 flex flex-col items-center gap-2 text-center
                ${!canBuy ? 'opacity-50' : ''}`}
            >
              <span className="text-4xl">{reward.emoji}</span>
              <p className="text-white text-xs font-bold leading-tight">{reward.name}</p>
              <div className="flex items-center gap-1">
                <span className="text-yellow-400 text-sm">🪙</span>
                <span className="text-yellow-400 text-lg font-black" style={{ fontFamily: "'Fredoka One', cursive" }}>
                  {reward.cost}
                </span>
              </div>
              <button
                onClick={() => onBuy(reward)}
                disabled={!canBuy}
                className={`btn-press w-full py-2 rounded-xl text-xs font-black transition-all
                  ${canBuy
                    ? 'text-gray-900 hover:scale-105'
                    : 'bg-white/10 text-white/30 cursor-not-allowed'
                  }`}
                style={canBuy ? { background: 'linear-gradient(135deg, #fbbf24, #f97316)' } : {}}
              >
                {canBuy ? 'Ol! 🛒' : `${reward.cost - coins} tanga kam`}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
