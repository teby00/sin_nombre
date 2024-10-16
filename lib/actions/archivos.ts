'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

const token = cookies().get('session')?.value;

export async function addArchivo(data: FormData) {
  try {
    const response = await fetch(process.env.BACKEND_URL! + 'archivos/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });
    if (!response.ok) {
      if (response.status === 401) {
        return 'No autorizado.';
      }
      return 'Error al agregar el archivo.';
    }
    revalidateTag('archivos');
    return;
  } catch (error) {
    return 'Error al conectar con el servidor.';
  }
}

export async function editArchivo(id: number, data: FormData) {
  try {
    const response = await fetch(
      process.env.BACKEND_URL! + `archivos/edit/${id}/`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }
    );
    if (!response.ok) {
      if (response.status === 404) {
        return 'Archivo no encontrado.';
      }
      if (response.status === 401) {
        return 'No autorizado.';
      }

      return 'Error al editar el archivo.';
    }
    revalidateTag('archivos');
    return;
  } catch (error) {
    return 'Error al conectar con el servidor.';
  }
}

export async function deleteArchivo(id: number) {
  try {
    const response = await fetch(process.env.BACKEND_URL! + `archivos/${id}/`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      if (response.status === 404) {
        return 'Archivo no encontrado.';
      }
      if (response.status === 401) {
        return 'No autorizado.';
      }
      return 'Error al eliminar el archivo.';
    }
    revalidateTag('archivos');
    return;
  } catch (error) {
    return 'Error al conectar con el servidor.';
  }
}
