'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

const token = cookies().get('session')?.value;

export async function addArticulo(formData: FormData) {
  try {
    const response = await fetch(process.env.BACKEND_URL! + 'articulos/', {
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
      return 'Error al agregar la pregunta.';
    }
    revalidateTag('articulos');
    return;
  } catch (error) {
    return 'Error al conectar con el servidor.';
  }
}

export async function editArticulo(id: number, data: FormData) {
  try {
    const response = await fetch(
      process.env.BACKEND_URL! + `articulos/${id}/`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }
    );
    if (!response.ok) {
      if (response.status === 404) {
        return 'Articulo no encontrado.';
      }
      if (response.status === 401) {
        return 'No autorizado.';
      }

      return 'Error al editar el articulo.';
    }
    revalidateTag('articulos');
    return;
  } catch (error) {
    return 'Error al conectar con el servidor.';
  }
}

export async function deleteArticulo(id: number) {
  try {
    const response = await fetch(
      process.env.BACKEND_URL! + `articulos/${id}/`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      if (response.status === 404) {
        return 'Articulo no encontrado.';
      }
      if (response.status === 401) {
        return 'No autorizado.';
      }
      return 'Error al eliminar el articulo.';
    }
    revalidateTag('articulos');
    return;
  } catch (error) {
    return 'Error al conectar con el servidor.';
  }
}
