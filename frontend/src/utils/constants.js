export const SUBJECTS = [
  {
    id: 'math',
    name: 'Matematika',
    emoji: '🔢',
    color: '#fbbf24',
    gradientFrom: 'rgba(251,191,36,0.18)',
    gradientTo: 'rgba(249,115,22,0.18)',
    borderColor: 'rgba(251,191,36,0.3)',
    start: 10,
    end: 12,
  },
  {
    id: 'english',
    name: 'Ingliz tili',
    emoji: '🇬🇧',
    color: '#60a5fa',
    gradientFrom: 'rgba(96,165,250,0.18)',
    gradientTo: 'rgba(34,211,238,0.18)',
    borderColor: 'rgba(96,165,250,0.3)',
    start: 14,
    end: 16,
  },
];

export const REWARDS = [
  { id: 1, name: "YouTube — 1 soat",         emoji: '📺', cost: 50,  category: 'screen' },
  { id: 2, name: "O'yin — 30 daqiqa",        emoji: '🎮', cost: 40,  category: 'screen' },
  { id: 3, name: "Muzqaymoq",                 emoji: '🍦', cost: 30,  category: 'food'   },
  { id: 4, name: "Chips paketi",              emoji: '🍟', cost: 20,  category: 'food'   },
  { id: 5, name: "Kino kechasi",              emoji: '🎬', cost: 80,  category: 'fun'    },
  { id: 6, name: "Do'stlar bilan uchrashuv", emoji: '🤝', cost: 60,  category: 'fun'    },
  { id: 7, name: "Yangi stiker",              emoji: '🌟', cost: 15,  category: 'item'   },
  { id: 8, name: "Pitsaga borish",            emoji: '🍕', cost: 100, category: 'food'   },
];

export const SHOP_CATEGORIES = [
  { id: 'all',    label: 'Hammasi' },
  { id: 'screen', label: '📱 Ekran' },
  { id: 'food',   label: '🍔 Yeyish' },
  { id: 'fun',    label: '🎉 Ko\'ngil' },
  { id: 'item',   label: '🛍 Narsa' },
];

export const LEVEL_XP    = [0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200];
export const LEVEL_NAMES = ['Yangi', "O'quvchi", 'Zukko', 'Aqlli', 'Super', 'Ustoz', 'Ninja', 'Pro', 'Legend', "G'olib"];
export const WEEK_LABELS  = ['Ya', 'Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh'];

export const API = '/api';
