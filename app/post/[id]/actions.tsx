'use server';

import { InferInput } from 'valibot';
import { OnlyContenidoSchema } from '@/lib/schemas';
import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';

export async function createComentario(
  data: InferInput<typeof OnlyContenidoSchema>,
  id: string
): Promise<string | void> {
  const token = cookies().get('session')?.value;
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

export async function deleteComentario(id: number): Promise<string | void> {
  const token = cookies().get('session')?.value;
  const response = await fetch(
    process.env.BACKEND_URL! + 'comentarios/eliminar/' + id + '/',
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    if (response.status === 401) {
      return 'No autorizado.';
    }
    if (response.status === 404) {
      return 'No existe el comentario.';
    }
    return 'Error inesperado.';
  }

  revalidateTag(`post-${id}`);
}
