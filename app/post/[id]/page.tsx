import FormComentarios from '@/components/FormComentarios';

import { getOnePost } from '@/lib/services/posts';
import { getSession } from '@/lib/getSession';
import CardPosts from '@/components/CardPosts';

export default async function Post({ params }: { params: { id: string } }) {
  const { id: userId } = getSession();
  const { data, error } = await getOnePost(params.id);

  return (
    <div className="flex flex-col items-center min-h-screen pt-8 gap-4">
      {data && (
        <CardPosts
          id={data.id}
          username={data.usuario.username}
          imagen={data.imagen}
          contenido={data.contenido}
          fecha={data.fecha}
          userId={userId}
        />
      )}
      <FormComentarios id={params.id} />
      {data?.comentarios && data?.comentarios?.length > 0 && (
        <div className="w-[600px] space-y-4">
          <h3 className="w-full text-start text-xl font-semibold">
            Comentarios
          </h3>
          {data.comentarios.map((comentario) => (
            <CardPosts
              key={comentario.id}
              id={comentario.id}
              username={comentario.usuario.username}
              contenido={comentario.contenido}
              fecha={comentario.fecha}
              userId={userId}
            />
          ))}
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
