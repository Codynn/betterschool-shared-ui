'use client';

import { useCallback, useEffect, useState } from 'react';
import type { SchoolUser } from '../types';

export const SCHOOL_TOKEN_KEY = 'schoolToken';
export const SCHOOL_USER_KEY = 'schoolUser';
export const SCHOOL_AUTH_EVENT = 'school-auth-change';

function readSchoolUser(): SchoolUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(SCHOOL_USER_KEY);
    return raw ? (JSON.parse(raw) as SchoolUser) : null;
  } catch {
    return null;
  }
}

function readSchoolToken(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(SCHOOL_TOKEN_KEY);
}

/**
 * Reads the directory app's localStorage-based login session. Works across
 * betterschool-new-landing and betterschool-school-directory since both are
 * served from the same origin (www.betterschool.app) via the Vercel rewrite.
 */
export function useSchoolAuth() {
  const [ready, setReady] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<SchoolUser | null>(null);

  const sync = useCallback(() => {
    setToken(readSchoolToken());
    setUser(readSchoolUser());
  }, []);

  useEffect(() => {
    sync();
    setReady(true);

    const onAuthChange = () => sync();
    const onStorage = (e: StorageEvent) => {
      if (e.key === SCHOOL_TOKEN_KEY || e.key === SCHOOL_USER_KEY || e.key === null) sync();
    };

    window.addEventListener(SCHOOL_AUTH_EVENT, onAuthChange);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener(SCHOOL_AUTH_EVENT, onAuthChange);
      window.removeEventListener('storage', onStorage);
    };
  }, [sync]);

  const logout = useCallback(() => {
    window.localStorage.removeItem(SCHOOL_TOKEN_KEY);
    window.localStorage.removeItem(SCHOOL_USER_KEY);
    window.dispatchEvent(new Event(SCHOOL_AUTH_EVENT));
  }, []);

  return { ready, authed: Boolean(token), token, user, logout };
}
