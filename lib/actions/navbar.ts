'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logout(): Promise<void> {
  cookies().delete('session');
  redirect('/login');
}
