import { getToken } from './authService';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export interface Application {
  _id: string;
  company: string;
  position: string;
  status: 'wishlist' | 'applied' | 'interview' | 'offer' | 'rejected';
  url?: string;
  notes?: string;
  appliedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationData {
  company: string;
  position: string;
  status?: 'wishlist' | 'applied' | 'interview' | 'offer' | 'rejected';
  url?: string;
  notes?: string;
  appliedAt?: string;
}

const authHeader = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${getToken()}`,
});

const handleResponse = async (res: Response) => {
  if (res.status === 204) return null;
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Request failed');
  return json;
};

export const getApplications = async (status?: Application['status']): Promise<Application[]> => {
  const url = new URL(`${BASE_URL}/applications`);
  if (status) url.searchParams.set('status', status);

  const res = await fetch(url.toString(), {
    headers: authHeader(),
  });

  return handleResponse(res);
};

export const getApplication = async (id: string): Promise<Application> => {
  const res = await fetch(`${BASE_URL}/applications/${id}`, {
    headers: authHeader(),
  });

  return handleResponse(res);
};

export const createApplication = async (data: ApplicationData): Promise<Application> => {
  const res = await fetch(`${BASE_URL}/applications`, {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(data),
  });

  return handleResponse(res);
};

export const updateApplication = async (id: string, data: Partial<ApplicationData>): Promise<Application> => {
  const res = await fetch(`${BASE_URL}/applications/${id}`, {
    method: 'PATCH',
    headers: authHeader(),
    body: JSON.stringify(data),
  });

  return handleResponse(res);
};

export const deleteApplication = async (id: string): Promise<null> => {
  const res = await fetch(`${BASE_URL}/applications/${id}`, {
    method: 'DELETE',
    headers: authHeader(),
  });

  return handleResponse(res); // returns null on 204
};
