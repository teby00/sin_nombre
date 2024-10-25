'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { InferInput } from 'valibot';
import { OnlyContenidoSchema } from '../schemas';

const token = cookies().get('session')?.value;

export async function addPreguntaChat(id: number) {
  try {
    const response = await fetch(
      process.env.BACKEND_URL! + 'chat/pregunta/' + id + '/',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      if (response.status === 401) {
        return 'No autorizado.';
      }
      return 'Error al agregar el archivo.';
    }
    revalidateTag('chat');
    return;
  } catch (error) {
    return 'Error al conectar con el servidor.';
  }
}

export async function addMessage(data: InferInput<typeof OnlyContenidoSchema>) {
  try {
    const response = await fetch(process.env.BACKEND_URL! + 'chat/', {
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
      return 'Error al agregar el mensaje.';
    }
    revalidateTag('chat');
    return;
  } catch (error) {
    return 'Error al conectar con el servidor.';
  }
}

export async function addMessageAdmin(
  id: string,
  data: InferInput<typeof OnlyContenidoSchema>
) {
  try {
    const response = await fetch(
      process.env.BACKEND_URL! + 'chat/' + id + '/',
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
      return 'Error al agregar el mensaje.';
    }
    revalidateTag('chat');
    revalidateTag(`chat-${id}`);
    return;
  } catch (error) {
    return 'Error al conectar con el servidor.';
  }
}
