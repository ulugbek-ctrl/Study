import { useState, useEffect, useCallback } from 'react';
import { api } from '../utils/api.js';

export function useStats() {
  const [stats, setStats]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  const load = useCallback(async () => {
    try {
      setError(null);
      const data = await api.getStats();
      setStats(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const completeLesson = useCallback(async (subjectId) => {
    const result = await api.completeLesson(subjectId);
    setStats(result.db);
    return result;
  }, []);

  const buyReward = useCallback(async (reward) => {
    const result = await api.buyReward(reward);
    setStats(result.db);
    return result;
  }, []);

  const reset = useCallback(async () => {
    const fresh = await api.reset();
    setStats(fresh);
  }, []);

  return { stats, loading, error, reload: load, completeLesson, buyReward, reset };
}
