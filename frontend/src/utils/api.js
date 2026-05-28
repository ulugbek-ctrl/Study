const BASE = '/api';

async function req(method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Server xatosi');
  return data;
}

export const api = {
  getStats:    ()            => req('GET',    '/stats'),
  completeLesson: (subjectId) => req('POST',   '/complete', { subjectId }),
  buyReward:   (reward)      => req('POST',    '/buy',      { reward }),
  getPurchases:()            => req('GET',    '/purchases'),
  reset:       ()            => req('DELETE', '/reset'),
};
