interface Post {
  id: number;
  contenido: string;
  fecha: string;
  comentarios: number;
  usuario__username: string;
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
