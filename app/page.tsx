import CardPosts from '@/components/CardPosts';
import PostForm from '@/components/PostForm';
import { getSession } from '@/lib/getSession';
import { getPosts } from '@/lib/services/posts';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default async function Home() {
  const { id: userId } = getSession();
  const { data, error } = await getPosts();

  return (
    <div className="flex flex-col items-center min-h-screen pt-8 mb-36 gap-8">
      <PostForm />
      {data?.map((post) => (
        <Link scroll={true} key={post.id} href={`/post/${post.id}`}>
          <CardPosts
            id={post.id}
            usuario={post.usuario}
            contenido={post.contenido}
            fecha={post.fecha}
            imagen={post.imagen}
            userId={userId}
            footer={
              <span className="flex gap-1">
                <MessageCircle size={24} /> {post.num_comentarios}
              </span>
            }
          />
        </Link>
      ))}
      {error && <p className="text-danger-500">{error}</p>}
    </div>
  );
}
