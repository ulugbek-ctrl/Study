# 🚀 Sardor Study Zone

Sardor (6-sinf) uchun to'liq gamifikatsiya o'quv ilovasi.

## Loyiha tuzilmasi

```
sardor-app/
├── backend/               # Express.js REST API
│   ├── server.js          # Barcha route'lar
│   ├── db.json            # Ma'lumotlar (avtomatik yaratiladi)
│   └── package.json
│
└── frontend/              # React + Tailwind
    ├── src/
    │   ├── components/    # Kichik UI komponentlar
    │   │   ├── BottomNav.jsx
    │   │   ├── StatCard.jsx
    │   │   ├── SubjectTimer.jsx
    │   │   ├── Toast.jsx
    │   │   └── XpBar.jsx
    │   ├── hooks/         # Custom React hooks
    │   │   ├── useStats.js
    │   │   └── useTimer.js
    │   ├── pages/         # Asosiy sahifalar
    │   │   ├── Dashboard.jsx
    │   │   ├── Shop.jsx
    │   │   └── Stats.jsx
    │   ├── utils/         # Yordamchi funksiyalar
    │   │   ├── api.js
    │   │   ├── constants.js
    │   │   └── helpers.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

## Ishga tushirish

### 1. Backend

```bash
cd backend
npm install
npm run dev
# → http://localhost:3001
```

### 2. Frontend (yangi terminal)

```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

## API Endpoints

| Method | Path              | Tavsif                    |
|--------|-------------------|---------------------------|
| GET    | /api/stats        | Barcha ma'lumotlar         |
| PATCH  | /api/stats        | Istalgan maydonni yangilash|
| POST   | /api/complete     | Darsni tugatish (coin+XP) |
| POST   | /api/buy          | Mukofot sotib olish        |
| GET    | /api/purchases    | Xaridlar tarixi            |
| DELETE | /api/reset        | Sifirdan boshlash          |

## Xususiyatlar

| Feature         | Tafsilot                                         |
|-----------------|--------------------------------------------------|
| ⏱ Timer         | Matematika 10-12, Ingliz 14-16 — real vaqt ring  |
| 🪙 Tangalar      | Dars tugallaganda +25 tanga (server tomonida)    |
| ⚡ XP + Darajalar| 10 daraja: Yangi → G'olib                        |
| 🔥 Streak        | Ketma-ket o'qish (server tomonida hisoblanadi)   |
| 🏪 Do'kon        | 8 ta mukofot, kategori filtr                     |
| 📊 Statistika    | Haftalik bar chart, trend, per-subject progress  |
| 💾 Saqlash       | JSON fayl (db.json) — hamma narsa saqlanadi      |

Yaxshi o'qi, Sardor! 💪
