import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3001;
const DB_FILE = path.join(__dirname, 'db.json');

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

/* ── Helpers ── */
function readDB() {
  if (!fs.existsSync(DB_FILE)) return getDefaultDB();
  try { return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8')); }
  catch { return getDefaultDB(); }
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

function getDefaultDB() {
  return {
    coins: 30,
    xp: 120,
    streak: 3,
    lastDay: null,
    completed: {},
    history: {},
    purchases: [],
    createdAt: new Date().toISOString(),
  };
}

/* ── Routes ── */

// GET all stats
app.get('/api/stats', (req, res) => {
  res.json(readDB());
});

// PATCH update any field(s)
app.patch('/api/stats', (req, res) => {
  const db = readDB();
  const updated = { ...db, ...req.body };
  writeDB(updated);
  res.json(updated);
});

// POST complete a lesson
app.post('/api/complete', (req, res) => {
  const { subjectId } = req.body;
  const db = readDB();
  const today = new Date().toDateString();
  const key = `${today}_${subjectId}`;

  if (db.completed[key]) {
    return res.status(409).json({ error: 'already_completed', message: 'Bu dars bugun allaqachon bajarildi!' });
  }

  db.completed[key] = true;
  db.coins += 25;
  db.xp += 50;

  // Streak logic
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  if (db.lastDay === yesterday) db.streak += 1;
  else if (db.lastDay !== today) db.streak = 1;
  db.lastDay = today;

  // Weekly history (0=Sun ... 6=Sat)
  const dayIdx = new Date().getDay();
  db.history[dayIdx] = (db.history[dayIdx] || 0) + 50;

  writeDB(db);
  res.json({ db, gained: { coins: 25, xp: 50 } });
});

// POST buy reward
app.post('/api/buy', (req, res) => {
  const { reward } = req.body;
  const db = readDB();

  if (db.coins < reward.cost) {
    return res.status(400).json({ error: 'not_enough_coins', message: 'Tanga yetarli emas!' });
  }

  db.coins -= reward.cost;
  db.purchases.unshift({ ...reward, boughtAt: new Date().toISOString() });

  writeDB(db);
  res.json({ db, reward });
});

// GET purchase history
app.get('/api/purchases', (req, res) => {
  const db = readDB();
  res.json(db.purchases);
});

// DELETE reset (for testing)
app.delete('/api/reset', (req, res) => {
  const fresh = getDefaultDB();
  writeDB(fresh);
  res.json(fresh);
});

app.listen(PORT, () => {
  console.log(`✅ Sardor backend running → http://localhost:${PORT}`);
});
