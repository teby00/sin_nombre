'use server';

import { PreguntaEdit } from '@/app/dashboard/preguntas/types';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

const token = cookies().get('session')?.value;

export async function addPregunta(data: PreguntaEdit) {
  try {
    const response = await fetch(
      process.env.BACKEND_URL! + 'pregunta_frecuente/',
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
      return 'Error al agregar la pregunta.';
    }
    revalidateTag('preguntas');
    return;
  } catch (error) {
    return 'Error al conectar con el servidor.';
  }
}

export async function editPregunta(id: number, data: PreguntaEdit) {
  try {
    const response = await fetch(
      process.env.BACKEND_URL! + `pregunta_frecuente/${id}/`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      if (response.status === 404) {
        return 'Pregunta no encontrada.';
      }
      if (response.status === 401) {
        return 'No autorizado.';
      }

      return 'Error al editar la pregunta.';
    }
    revalidateTag('preguntas');
    return;
  } catch (error) {
    return 'Error al conectar con el servidor.';
  }
}

export async function deletePregunta(id: number) {
  try {
    const response = await fetch(
      process.env.BACKEND_URL! + `pregunta_frecuente/${id}/`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      if (response.status === 404) {
        return 'Pregunta no encontrada.';
      }
      if (response.status === 401) {
        return 'No autorizado.';
      }
      return 'Error al eliminar la pregunta.';
    }
    revalidateTag('users');
    return;
  } catch (error) {
    return 'Error al conectar con el servidor.';
  }
}
