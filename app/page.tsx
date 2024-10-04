import PostForm from '@/components/PostForm';
import { getPosts } from '@/lib/services/posts';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { MessageCircle, Clock } from 'lucide-react';

export default async function Home() {
  const { data, error } = await getPosts();
  return (
    <div className="flex flex-col items-center min-h-screen pt-8 gap-8">
      <PostForm />
      {data?.map((post) => (
        <Card isHoverable key={post.id} className="w-[600px] cursor-pointer">
          <CardHeader className="font-semibold">
            {post.usuario__username}
          </CardHeader>
          <CardBody>{post.contenido}</CardBody>
          <CardFooter className="text-default-500 gap-4">
            <span className="flex gap-1">
              <Clock size={24} />
              <time>{post.fecha}</time>
            </span>

            <span className="flex gap-1">
              <MessageCircle size={24} /> {post.comentarios}
            </span>
          </CardFooter>
        </Card>
      ))}
      {error && <p className="text-danger-500">{error}</p>}
    </div>
  );
}
