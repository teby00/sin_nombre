import { Usuario } from '@/app/dashboard/users/types';
import { cookies } from 'next/headers';

export interface Articulo {
  id: number;
  fecha: string;
  titulo: string;
  contenido: string;
  imagen: string;
  slug: string;
  usuario: Usuario;
}

export async function getArticulos(): Promise<{
  data: Articulo[] | null;
  error: string | null;
}> {
  try {
    const token = cookies().get('session')?.value;
    const response = await fetch(process.env.BACKEND_URL! + 'articulos/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ['articulos'] },
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

export async function getOneArticulo(slug: string): Promise<{
  data: Articulo | null;
  error: string | null;
}> {
  try {
    const token = cookies().get('session')?.value;
    const response = await fetch(
      process.env.BACKEND_URL! + 'articulos/' + slug + '/',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { tags: [`articulo-${slug}`] },
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
