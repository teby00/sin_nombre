import { cookies } from 'next/headers';

enum De {
  Usuario = 'USUARIO',
  Admin = 'ADMIN',
}

export interface Mensaje {
  id: number;
  de: De;
  contenido: string;
  fecha: string;
}

export async function getMensajes(): Promise<{
  data: Mensaje[] | null;
  error: string | null;
}> {
  try {
    const token = cookies().get('session')?.value;
    const response = await fetch(process.env.BACKEND_URL! + 'chat/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ['chat'] },
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
