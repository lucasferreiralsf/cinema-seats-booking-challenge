'use server';
import { API_URL } from '@/shared/constants';
import { CinemaSession } from '@/shared/types/CinemaSession.type';
import { Seat } from '@/shared/types/Seat.type';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function getSessions(): Promise<CinemaSession[]> {
  const response = await fetch(`${API_URL}/api/sessions`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch sessions');
  }

  return response.json();
}

export async function getSeats(sessionId: string): Promise<Seat[]> {
  const response = await fetch(`${API_URL}/api/sessions/${sessionId}/seats`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch seats');
  }

  return response.json();
}

export async function reserveSeat(
  prevState: {
    message: string;
    error: boolean;
  },
  formData: FormData
) {
  const sessionId = formData.get('sessionId') as string;
  const seatId = formData.get('seatId') as string;
  const token = (await cookies()).get('token')?.value;
  if (!token) {
    redirect('/sign-in');
  }
  const response = await fetch(
    `${API_URL}/api/sessions/${sessionId}/seats/reserve`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ seatId }),
    }
  );

  if (!response.ok) {
    console.log('🚀 ~ response:', response);
    const errorData = await response.json();
    revalidatePath('/');
    return {
      message: 'Failed to reserve seat: ' + errorData.error,
      error: true,
      id: seatId,
    };
  }
  revalidatePath('/');
  return { message: 'Successfully reserved seat!', error: false, id: seatId };
}
