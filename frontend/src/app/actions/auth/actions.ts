'use server';

import { API_URL } from '@/shared/constants';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function signUp(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const response = await fetch(`${API_URL}/api/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    return { message: 'Failed to sign up' };
  }
  redirect('/sign-in');
}

export async function signIn(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const response = await fetch(`${API_URL}/api/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    return { message: 'Failed to sign in' };
  }

  const data = await response.json();

  (await cookies()).set('token', data.token);

  redirect('/');
}
