import { Post } from '@/lib/services/posts';
import Link from 'next/link';
import CardPosts from './CardPosts';
import { MessageCircle } from 'lucide-react';

export default async function ListPostsMain({
  data,
  userId,
}: {
  data: Post[];
  userId: string;
}) {
  return (
    <>
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
            showDropdown={false}
          />
        </Link>
      ))}
    </>
  );
}
