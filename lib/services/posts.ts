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
  const response = await fetch(process.env.BACKEND_URL! + 'publicaciones/');
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
}
