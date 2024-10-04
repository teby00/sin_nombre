'use client';

import { useState } from 'react';

import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { Textarea } from '@nextui-org/input';
import { ImagePlus } from 'lucide-react';
import { toast } from 'sonner';

import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { PostSchema } from '@/lib/schemas';
import { InferInput } from 'valibot';

import { createPost } from '@/lib/actions/root';

export default function PostForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: valibotResolver(PostSchema),
    defaultValues: {
      contenido: '',
    },
  });

  const onSubmit = async (
    dataForm: InferInput<typeof PostSchema>
  ): Promise<void> => {
    try {
      setIsLoading(true);
      const error = await createPost(dataForm);
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
        <CardBody className="pb-0">
          <Textarea
            minRows={2}
            isInvalid={!!errors.contenido}
            errorMessage={errors.contenido?.message}
            {...register('contenido')}
            placeholder="Algun problema?"
          />
        </CardBody>
        <CardFooter className="flex justify-between text-default-500">
          <label className="cursor-pointer">
            <ImagePlus />
            <input
              //   {...register('imagen')}
              type="file"
              accept="image/*"
              className="hidden"
            />
          </label>
          <Button isLoading={isLoading} color="primary" type="submit">
            Publicar
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
