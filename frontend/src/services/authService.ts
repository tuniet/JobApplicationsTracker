import type { RegisterData, LoginData, AuthResponse } from '../types/auth';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const res = await fetch(`${BASE_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) {
    if (json.errors && Array.isArray(json.errors)) {
      throw new Error(json.errors.map((e: { msg: string }) => e.msg).join(', '));
    }
    throw new Error(json.message || 'Registration failed');
  }

  return json;
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const res = await fetch(`${BASE_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Login failed');
  return json;
};

export const saveToken = (token: string) => localStorage.setItem('token', token);
export const getToken  = () => localStorage.getItem('token');
export const logout    = () => localStorage.removeItem('token');
