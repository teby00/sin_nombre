'use client';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Dot } from 'lucide-react';
import { DateTime } from 'luxon';
import CardDropdown from './CardDropdown';
import { Imagen } from '@/lib/services/posts';
import Image from 'next/image';

import useEmblaCarousel from 'embla-carousel-react';
import { SelectedSnapDisplay, useSelectedSnapDisplay } from './ui/EmblaCount';
import { Usuario } from '@/app/dashboard/users/types';

interface PostsProps {
  id: number;
  usuario: Usuario;
  fecha: string;
  contenido: string;
  imagen?: Imagen[] | null;
  userId: string | null;
  footer?: React.ReactNode;
}

export default function CardPosts({
  usuario,
  fecha,
  contenido,
  imagen,
  userId,
  footer,
}: PostsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi);
  return (
    <Card className="w-[600px] bg-opacity-60">
      <CardHeader className="justify-between">
        <div className="flex items-center">
          <span>@{usuario.username}</span>
          <Dot />
          <span className="text-sm">
            {DateTime.fromISO(fecha).toRelative()}
          </span>
        </div>
        <CardDropdown userId={userId} postUserId={usuario.id.toString()} />
      </CardHeader>
      <CardBody className="space-y-4">
        <p>{contenido}</p>
        {imagen && imagen?.length > 0 && (
          <>
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {imagen?.map((img) => (
                  <div
                    key={img.imagen}
                    className="flex-shrink-0 flex-grow-0 basis-full min-w-0"
                  >
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
            <SelectedSnapDisplay
              selectedSnap={selectedSnap}
              snapCount={snapCount}
            />
          </>
        )}
      </CardBody>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}
