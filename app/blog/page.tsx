import { getArticulos } from '@/lib/services/blog';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import Image from 'next/image';
import Link from 'next/link';
import { DateTime } from 'luxon';
import { ImageOff } from 'lucide-react';

export default async function Blog() {
  const { data, error } = await getArticulos();

  return (
    <div className="w-full lg:px-16 mb-20 mt-12">
      <div className="text-center">
        <h1 className="mb-2 font-bold text-4xl">Últimas noticias</h1>
        <h5 className="text-default-500 text-lg">
          Mantente al tanto de las últimas noticias de ciberseguridad.
        </h5>
      </div>
      <div className="mt-10 grid gap-4 px-40 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        {data?.map((articulo) => (
          <Link key={articulo.id} href={`/blog/${articulo.slug}`}>
            <Card className="py-4 h-full">
              <CardBody className="overflow-visible py-2">
                {articulo.imagen ? (
                  <Image
                    alt="Card background"
                    className="object-cover rounded-xl aspect-video"
                    src={
                      process.env.NEXT_PUBLIC_BACKEND_MEDIA + articulo.imagen
                    }
                    width={400}
                    height={270}
                  />
                ) : (
                  <div className="aspect-video bg-default-200 rounded-xl flex justify-center items-center text-default-500">
                    <ImageOff size={40} />
                  </div>
                )}
              </CardBody>
              <CardFooter className="block h-full">
                <h4 className="font-bold text-large">{articulo.titulo}</h4>
                <p className="text-sm text-default-500">
                  {DateTime.fromISO(articulo.fecha).toRelative()}
                </p>
              </CardFooter>
            </Card>
          </Link>
        ))}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}
