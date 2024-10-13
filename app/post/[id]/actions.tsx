'use server';

import { InferInput } from 'valibot';
import { OnlyContenidoSchema } from '@/lib/schemas';
import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';

const token = cookies().get('session')?.value;

export async function createComentario(
  data: InferInput<typeof OnlyContenidoSchema>,
  id: string
): Promise<string | void> {
  const response = await fetch(
    process.env.BACKEND_URL! + 'comentarios/' + id + '/',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    if (response.status === 401) {
      return 'No autorizado.';
    }
    if (response.status === 404) {
      return 'No existe el usuario.';
    }
    return 'Error inesperado.';
  }

  revalidateTag(`post-${id}`);
}
