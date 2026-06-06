import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ChangeEvent, FormEvent } from 'react'
import { login, saveToken } from '../services/authService';
import type { LoginData } from '../services/authService';
import { FaGoogle } from "react-icons/fa";
import './Form.css'
interface Props {
  onSuccess?: () => void;
}

export default function LoginForm({ onSuccess }: Props) {
  const [form, setForm] = useState<LoginData>({ email: '', password: '' });
  const [error, setError] = useState<string>('');
  const [showPw, setShowPw] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleToRegister = () => {
    navigate('/register', { replace: false });
  }
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
    <form onSubmit={handleSubmit} className='form'>
      <h2>Log in</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className='field'>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          autoComplete="email"
          placeholder='you@example.com'
        />
      </div>
      <div className='field'>
        <label htmlFor="password">Password</label>
        <div className='input-wrap'>
          <input
            id="password"
            name="password"
            type={showPw ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
            minLength={8}
            placeholder='••••••••'
          />
          <button className="input-action" type="button"
            onClick={() => setShowPw(v => !v)}
            aria-label={showPw ? "Hide password" : "Show password"}>
            {showPw ? "○" : "●"}
          </button>
        </div>
      </div>
      <button type="submit" className='confirm-button' disabled={loading}>
        {loading ? 'Logging in...' : 'Continue →'}
      </button>
      <div className="divider-or">or continue with</div>
      <button type="button" className='google confirm-button'><FaGoogle /> Google</button>
      <div className="hint">No account? <span onClick={handleToRegister}>Create one — it's free</span></div>
    </form>
  );
}
