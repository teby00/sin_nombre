'use server';

import { InferInput } from 'valibot';
import { PostSchema } from '@/lib/schemas';
import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';

const token = cookies().get('session')?.value;

export async function createPost(
  data: InferInput<typeof PostSchema>
): Promise<string | void> {
  const response = await fetch(process.env.BACKEND_URL! + 'publicaciones/', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
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
