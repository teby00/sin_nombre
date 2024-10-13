import { PreguntaFrecuente } from '@/app/dashboard/preguntas/types';
import { Usuario } from '@/app/dashboard/users/types';
import { cookies } from 'next/headers';

enum NotificacionType {
  Publicacion = 'PUBLICACION',
  Comentario = 'COMENTARIO',
}

interface Notificaciones {
  id: number;
  tipo: NotificacionType;
  publicacion: number;
  de: Usuario;
  para: Usuario;
  fecha: string;
  vista: boolean;
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
