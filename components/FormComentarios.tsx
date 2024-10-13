'use client';

import { useState } from 'react';

import { Button } from '@nextui-org/button';
import { Card, CardBody } from '@nextui-org/card';
import { Input } from '@nextui-org/input';
import { Send } from 'lucide-react';

import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { OnlyContenidoSchema } from '@/lib/schemas';
import { InferInput } from 'valibot';
import { toast } from 'sonner';
import { createComentario } from '@/app/post/[id]/actions';

export default function FormComentarios({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: valibotResolver(OnlyContenidoSchema),
    defaultValues: {
      contenido: '',
    },
  });

  const onSubmit = async (
    dataForm: InferInput<typeof OnlyContenidoSchema>
  ): Promise<void> => {
    try {
      setIsLoading(true);
      const error = await createComentario(dataForm, id);
      if (error) {
        toast.error(error);
      }
    } catch (e) {
      toast.error('Error al conectar con el servidor.');
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  return (
    <Card className="w-[600px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardBody className="flex flex-row gap-1">
          <Input
            {...register('contenido')}
            isInvalid={!!errors.contenido}
            errorMessage={errors.contenido?.message}
            placeholder="Escribe un comentario..."
          />
          <Button
            isLoading={isLoading}
            type="submit"
            color="primary"
            isIconOnly
          >
            <Send size={20} />
          </Button>
        </CardBody>
      </form>
    </Card>
  );
}
