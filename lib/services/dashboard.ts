import { PreguntaFrecuente } from '@/app/dashboard/preguntas/types';
import { Usuario } from '@/app/dashboard/users/types';
import { cookies } from 'next/headers';
import { Mensaje } from './chat';

enum NotificacionType {
  Publicacion = 'PUBLICACION',
  Comentario = 'COMENTARIO',
  Mensaje = 'MENSAJE',
}

interface Notificaciones {
  id: number;
  tipo: NotificacionType;
  publicacion: { id: number };
  chat: { id: number };
  de: Usuario;
  para: Usuario;
  fecha: string;
  vista: boolean;
}

interface Chat {
  id: number;
  usuario: Usuario;
  mensajes: Mensaje[];
  last_message_fecha: string;
  last_message_contenido: string;
}

export async function getNotifications(): Promise<{
  data: Notificaciones[] | null;
  error: string | null;
}> {
  try {
    const token = cookies().get('session')?.value;
    const response = await fetch(process.env.BACKEND_URL! + 'notificaciones/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ['notificaciones'] },
    });
    if (!response.ok) {
      if (response.status === 401) {
        return {
          data: null,
          error: 'No autorizado.',
        };
      }
      return {
        data: null,
        error: 'Error inesperado.',
      };
    }
    const res = await response.json();
    return {
      data: res,
      error: null,
    };
  } catch (e) {
    return {
      data: null,
      error: 'Error al conectar con el servidor.',
    };
  }
}

export async function getUsers(): Promise<{
  data: Usuario[] | null;
  error: string | null;
}> {
  try {
    const token = cookies().get('session')?.value;
    const response = await fetch(process.env.BACKEND_URL! + 'usuarios/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ['usuarios'] },
    });
    if (!response.ok) {
      if (response.status === 401) {
        return {
          data: null,
          error: 'No autorizado.',
        };
      }
      return {
        data: null,
        error: 'Error inesperado.',
      };
    }
    const res = await response.json();
    return {
      data: res,
      error: null,
    };
  } catch (e) {
    return {
      data: null,
      error: 'Error al conectar con el servidor.',
    };
  }
}

export async function getPreguntas(): Promise<{
  data: PreguntaFrecuente[] | null;
  error: string | null;
}> {
  try {
    const token = cookies().get('session')?.value;
    const response = await fetch(
      process.env.BACKEND_URL! + 'pregunta_frecuente/',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { tags: ['preguntas'] },
      }
    );
    if (!response.ok) {
      if (response.status === 401) {
        return {
          data: null,
          error: 'No autorizado.',
        };
      }
      return {
        data: null,
        error: 'Error inesperado.',
      };
    }
    const res = await response.json();
    return {
      data: res,
      error: null,
    };
  } catch (e) {
    return {
      data: null,
      error: 'Error al conectar con el servidor.',
    };
  }
}

export async function getChatAdmin(id: string): Promise<{
  data: Mensaje[] | null;
  error: string | null;
}> {
  try {
    const token = cookies().get('session')?.value;
    const response = await fetch(
      process.env.BACKEND_URL! + 'chat/' + id + '/',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { tags: [`chat-${id}`] },
      }
    );
    if (!response.ok) {
      if (response.status === 401) {
        return {
          data: null,
          error: 'No autorizado.',
        };
      }
      return {
        data: null,
        error: 'Error inesperado.',
      };
    }
    const res = await response.json();
    return {
      data: res,
      error: null,
    };
  } catch (e) {
    return {
      data: null,
      error: 'Error al conectar con el servidor.',
    };
  }
}

export async function getAllChats(): Promise<{
  data: Chat[] | null;
  error: string | null;
}> {
  try {
    const token = cookies().get('session')?.value;
    const response = await fetch(
      process.env.BACKEND_URL! + 'chat/*/all-chats/',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { tags: ['all-chats'] },
      }
    );
    if (!response.ok) {
      if (response.status === 401) {
        return {
          data: null,
          error: 'No autorizado.',
        };
      }
      return {
        data: null,
        error: 'Error inesperado.',
      };
    }
    const res = await response.json();
    return {
      data: res,
      error: null,
    };
  } catch (e) {
    return {
      data: null,
      error: 'Error al conectar con el servidor.',
    };
  }
}
