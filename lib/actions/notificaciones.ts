'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export default async function deleteNotificaciones(): Promise<string | void> {
  const token = cookies().get('session')?.value;
  const response = await fetch(process.env.BACKEND_URL! + 'notificaciones/', {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      return 'No autorizado.';
    }
    return 'Error inesperado.';
  }

  revalidateTag('notificaciones');
}
