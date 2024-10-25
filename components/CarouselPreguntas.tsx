'use client';

import { PreguntaFrecuente } from '@/app/dashboard/preguntas/types';
import { addPreguntaChat } from '@/lib/actions/chat';
import { Card, CardBody } from '@nextui-org/card';
import useEmblaCarousel from 'embla-carousel-react';

export default function CarouselPreguntas({
  preguntas,
}: {
  preguntas: PreguntaFrecuente[];
}) {
  const [emblaRef] = useEmblaCarousel();

  const handleCreate = async (id: number): Promise<void> => {
    await addPreguntaChat(id);
  };

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {preguntas.map((pregunta, index) => (
          <div
            key={index}
            onClick={() => handleCreate(pregunta.id)}
            className="flex-shrink-0 flex-grow-0 basis-[14rem] min-w-0"
          >
            <Card key={index} className="w-48 aspect-square cursor-pointer">
              <CardBody className="text-xl font-semibold p-4">
                {pregunta.pregunta}
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
