import { LeftArrow } from '@/components/ui/icons';
import { getOneArticulo } from '@/lib/services/blog';
import { Link } from '@nextui-org/link';
import Image from 'next/image';
import { DateTime } from 'luxon';

export default async function Article({
  params,
}: {
  params: { slug: string };
}) {
  const { data, error } = await getOneArticulo(params.slug);

  return (
    <div className="w-full mt-12 mb-36 flex flex-col justify-start items-center prose prose-neutral">
      <div className="w-full max-w-4xl">
        {error && <p className="text-red-500">{error}</p>}
        <Link className="mb-8" color="foreground" href="/blog">
          <LeftArrow />
          Volver al blog
        </Link>
        <p className="text-sm text-default-500 mb-4">
          {data && DateTime.fromISO(data.fecha).toRelative()}
        </p>
        <h1 className="mb-6 font-bold text-4xl">{data?.titulo}</h1>
        {data?.imagen && (
          <Image
            src={process.env.NEXT_PUBLIC_BACKEND_MEDIA! + data?.imagen}
            className="w-full aspect-video mb-8 rounded-lg"
            alt="foto blog"
            width={700}
            height={350}
          />
        )}
        <div className="prose">
          <p className="text-default-700 text-lg leading-relaxed mb-4 whitespace-pre-line">
            {data?.contenido}
          </p>
        </div>
      </div>
    </div>
  );
}
