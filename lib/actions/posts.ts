'use server';

import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPost(formData: FormData): Promise<string | void> {
  const token = cookies().get('session')?.value;
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

export async function editPost(
  id: string,
  formData: FormData
): Promise<string | void> {
  const token = cookies().get('session')?.value;
  const response = await fetch(
    process.env.BACKEND_URL! + 'publicaciones/' + id,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
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

export async function deletePost(id: number): Promise<string | void> {
  const token = cookies().get('session')?.value;
  const response = await fetch(
    process.env.BACKEND_URL! + 'publicaciones/eliminar/' + id + '/',
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
    if (response.status === 403) {
      return 'No autorizado.';
    }
    if (response.status === 404) {
      return 'No existe la publicación.';
    }
    return 'Error inesperado.';
  }

  revalidateTag('posts');
  redirect('/');
}
