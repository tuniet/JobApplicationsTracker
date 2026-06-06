import { useState } from 'react';
import type { FormEvent } from 'react'
import { register, saveToken } from '../services/authService';
import type { RegisterData } from '../services/authService';
import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Form.css'
interface Props {
  onSuccess?: () => void;
}

export default function RegisterForm({ onSuccess }: Props) {
  const [form, setForm] = useState<RegisterData>({ name: '', email: '', password: '' });
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [agreed, setAgreed] = useState<boolean>(false);
  const [showPw, setShowPw] = useState<boolean>(false);
  const [showConfirmPw, setShowConfirmPw] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focused, setFocused] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();


  const handleToLogin = () => {
    navigate('/', { replace: false });
  }

  const update = (key: keyof typeof form, val: string): void => {
    setForm(f => ({ ...f, [key]: val }));
    if (errors[key]) setErrors(e => ({ ...e, [key]: "" }));
  };

  const validate = (): Record<string, string> => {
    const errs: Record<string, string> = {};
    if (!form.name) errs.name = "Required";
    if (!form.email) errs.email = "Required";
    if (!form.email.includes("@")) errs.email = "Email not valid"
    if (!form.password) errs.password = "Required";
    else if (form.password.length < 8) errs.password = "Minimum 8 characters";
    if (!confirmPassword) errs.confirmPassword = "Required";
    else if (form.password !== confirmPassword) errs.confirmPassword = "Passwords do not match";
    if (!agreed) errs.terms = "You must agree to continue";
    return errs;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    console.log(form);
    try {
      const { token } = await register(form);
      saveToken(token);
      onSuccess?.();
    } catch (err) {
      console.log(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='form'>
      <div className="form-wrap">
        <h2>Create account</h2>

        <div className={[
          "field",
          focused === "name" ? "focused" : "",
          errors.name ? "has-error" : "",
        ].filter(Boolean).join(" ")}>
          <label htmlFor="name">Full name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={e => update("name", e.target.value)}
            onFocus={() => setFocused("name")}
            onBlur={() => setFocused(null)}
            placeholder="John Doe"

            autoComplete="name"
          />
          {errors.name && <div className="field-error" style={{ marginTop: 4 }}><span>⚠</span> {errors.name}</div>}
        </div>

        <div className={[
          "field",
          focused === "email" ? "focused" : "",
          errors.email ? "has-error" : "",
        ].filter(Boolean).join(" ")}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={e => update("email", e.target.value)}
            onFocus={() => setFocused("email")}
            onBlur={() => setFocused(null)}
            placeholder="you@example.com"

            autoComplete="email"
          />
          {errors.email && <div className="field-error" style={{ marginTop: 4 }}><span>⚠</span> {errors.email}</div>}
        </div>

        <div className={[
          "field",
          focused === "password" ? "focused" : "",
          errors.password ? "has-error" : "",
        ].filter(Boolean).join(" ")}>
          <label htmlFor="password">Password</label>
          <div className='input-wrap'>
            <input
              id="password"
              name="password"
              type={showPw ? "text" : "password"}
              value={form.password}
              onChange={e => update("password", e.target.value)}
              onFocus={() => setFocused("password")}
              onBlur={() => setFocused(null)}
              autoComplete="new-password"
              placeholder="Minimun 8 characters"
              minLength={8}
            />
            <button className="input-action" type="button"
              onClick={() => setShowPw(v => !v)}
              aria-label={showPw ? "Hide password" : "Show password"}>
              {showPw ? "○" : "●"}
            </button>
          </div>
          {errors.password && <div className="field-error" style={{ marginTop: 4 }}><span>⚠</span> {errors.password}</div>}
        </div>

        <div className={[
          "field",
          focused === "confirmPassword" ? "focused" : "",
          errors.confirmPassword ? "has-error" : "",
        ].filter(Boolean).join(" ")}>
          <label htmlFor="confirmPassword">Confirm password</label>
          <div className='input-wrap'>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPw ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onFocus={() => setFocused("Confirmpassword")}
              onBlur={() => setFocused(null)}
              placeholder="Repeat your password"
              autoComplete="new-confirmpassword"
            />
            <button className="input-action" type="button"
              onClick={() => setShowConfirmPw(v => !v)}
              aria-label={showConfirmPw ? "Hide password" : "Show password"}>
              {showConfirmPw ? "○" : "●"}
            </button>
          </div>
          {errors.confirmPassword && <div className="field-error" style={{ marginTop: 4 }}><span>⚠</span> {errors.confirmPassword}</div>}
        </div>
        <div className="terms-row">
          <div
            className={`checkbox-wrap${agreed ? " checked" : ""}`}
            onClick={() => { setAgreed(v => !v); setErrors(e => ({ ...e, terms: "" })); }}
            role="checkbox"
            aria-checked={agreed}
            tabIndex={0}
            onKeyDown={e => e.key === " " && setAgreed(v => !v)}
          />
          <div className="terms-text">
            I agree to the <a>Terms of Service</a> and <a>Privacy Policy</a>.
            {errors.terms && <div className="field-error" style={{ marginTop: 4 }}><span>⚠</span> {errors.terms}</div>}
          </div>
        </div>
        <button type="submit" className='confirm-button' disabled={loading}>
          {loading ? 'Creating account...' : 'Register'}
        </button>
        <div className="divider-or">or continue with</div>
        <button type="button" className='google confirm-button'><FaGoogle /> Google</button>
        <div className="hint">Already have an account? <span onClick={handleToLogin}>Sign in</span></div>
      </div>
    </form>
  );
}
