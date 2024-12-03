import { useState, useEffect } from 'react';
import { User } from '../types/health';
import { auth } from '../utils/auth';

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = auth.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  return { user, loading };
};