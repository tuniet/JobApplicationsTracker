import { useState} from 'react';
import type { ChangeEvent, FormEvent} from 'react'
import { register, saveToken } from '../services/authService';
import type { RegisterData } from '../types/auth';

interface Props {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

export default function RegisterForm({ onSuccess, onSwitchToLogin }: Props) {
  const [form, setForm] = useState<RegisterData>({ name: '', email: '', password: '' });
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
      const { token } = await register(form);
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
      <h2>Create account</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          required
          autoComplete="name"
        />
      </div>

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
          autoComplete="new-password"
          minLength={8}
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Creating account...' : 'Register'}
      </button>

      {onSwitchToLogin && (
        <p>
          Already have an account?{' '}
          <button type="button" onClick={onSwitchToLogin}>
            Log in
          </button>
        </p>
      )}
    </form>
  );
}
