import { useState} from 'react';
import type { ChangeEvent, FormEvent} from 'react'
import { login, saveToken } from '../services/authService';
import type { LoginData } from '../types/auth';

interface Props {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
}

export default function LoginForm({ onSuccess, onSwitchToRegister }: Props) {
  const [form, setForm]       = useState<LoginData>({ email: '', password: '' });
  const [error, setError]     = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { token } = await login(form);
      saveToken(token);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log in</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          autoComplete="email"
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          autoComplete="current-password"
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Log in'}
      </button>

      {onSwitchToRegister && (
        <p>
          No account yet?{' '}
          <button type="button" onClick={onSwitchToRegister}>
            Register
          </button>
        </p>
      )}
    </form>
  );
}
