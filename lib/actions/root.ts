'use server';

import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';

const token = cookies().get('session')?.value;

export async function createPost(formData: FormData): Promise<string | void> {
  console.log(formData);
  const response = await fetch(process.env.BACKEND_URL! + 'publicaciones/', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    if (response.status === 401) {
      return 'No autorizado.';
    }
    if (response.status === 404) {
      return 'No existe el usuario.';
    }
    return 'Error inesperado.';
  }

  revalidateTag('posts');
}
