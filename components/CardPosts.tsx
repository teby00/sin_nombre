'use client';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Dot } from 'lucide-react';
import { DateTime } from 'luxon';
import CardDropdown from './CardDropdown';
import { Imagen } from '@/lib/services/posts';
import Image from 'next/image';

import useEmblaCarousel from 'embla-carousel-react';

interface PostsProps {
  id: number;
  username: string;
  fecha: string;
  contenido: string;
  imagen: Imagen[] | null;
  userId: string | null;
  footer?: React.ReactNode;
}

export default function CardPosts({
  id,
  username,
  fecha,
  contenido,
  imagen,
  userId,
  footer,
}: PostsProps) {
  const [emblaRef] = useEmblaCarousel();
  return (
    <Card className="w-[600px] bg-opacity-60">
      <CardHeader className="justify-between">
        <div className="flex items-center">
          <span>@{username}</span>
          <Dot />
          <span className="text-sm">
            {DateTime.fromISO(fecha).toRelative()}
          </span>
        </div>
        <CardDropdown userId={userId} postUserId={id.toString()} />
      </CardHeader>
      <CardBody className="space-y-4">
        <p>{contenido}</p>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {imagen?.map((img) => (
              <div className="flex-shrink-0 flex-grow-0 basis-4/5 min-w-0">
                <Image
                  key={img.imagen}
                  src={process.env.NEXT_PUBLIC_BACKEND_MEDIA + img.imagen}
                  alt="imagen"
                  className="rounded-lg w-full aspect-square object-cover"
                  width={400}
                  height={400}
                />
              </div>
            ))}
          </div>
        </div>
      </CardBody>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}
