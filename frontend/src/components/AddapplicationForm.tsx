import { useState} from 'react';
import type {ChangeEvent, FormEvent } from 'react'
import { createApplication} from '../services/applicationServices';
import type {ApplicationData } from '../services/applicationServices'

export default function AddApplicationForm() {
  const [form, setForm] = useState<ApplicationData>({
    company: '',
    position: '',
    status: 'applied',
    url: '',
    notes: '',
  });
  const [error, setError]     = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await createApplication(form);
      setSuccess('Application added!');
      setForm({ company: '', position: '', status: 'applied', url: '', notes: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Application</h2>

      {error   && <p style={{ color: 'red'   }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <div>
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          value={form.company}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="position">Position</label>
        <input
          id="position"
          name="position"
          type="text"
          value={form.position}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="status">Status</label>
        <select id="status" name="status" value={form.status} onChange={handleChange}>
          <option value="wishlist">Wishlist</option>
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div>
        <label htmlFor="url">Job URL</label>
        <input
          id="url"
          name="url"
          type="url"
          value={form.url}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows={4}
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Add Application'}
      </button>
    </form>
  );
}
