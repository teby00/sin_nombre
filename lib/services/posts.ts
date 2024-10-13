interface Usuario {
  id: number;
  username: string;
  rol: string;
}

export interface Imagen {
  imagen: string;
}

interface Post {
  id: number;
  contenido: string;
  fecha: string;
  imagen: Imagen[] | null;
  num_comentarios: number;
  usuario: Usuario;
}

interface Comentarios {
  id: number;
  usuario: Usuario;
  contenido: string;
  fecha: string;
}

interface PostDetalle extends Omit<Post, 'comentarios'> {
  comentarios: Comentarios[];
}

export async function getPosts(): Promise<{
  data: Post[] | null;
  error: string | null;
}> {
  try {
    const response = await fetch(process.env.BACKEND_URL! + 'publicaciones/', {
      next: { tags: ['posts'] },
    });
    if (!response.ok) {
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

export async function getOnePost(id: string): Promise<{
  data: PostDetalle | null;
  error: string | null;
}> {
  try {
    const response = await fetch(
      process.env.BACKEND_URL! + 'publicaciones/' + id + '/',
      {
        next: { tags: [`post-${id}`] },
      }
    );
    if (!response.ok) {
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
