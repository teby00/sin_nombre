'use client';

import { useMemo, useState } from 'react';

import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { Textarea } from '@nextui-org/input';
import { ImagePlus } from 'lucide-react';
import { toast } from 'sonner';

import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { OnlyContenidoSchema } from '@/lib/schemas';
import { InferInput } from 'valibot';

import { createPost } from '@/lib/actions/posts';
import ImagePreview from './ImagePreview';

export default function PostForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [images, setImages] = useState<FileList | null>(null);
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
      const formData = new FormData();
      formData.append('publicacion', JSON.stringify(dataForm));

      if (images) {
        Array.from(images).forEach((file) => formData.append('image', file));
      }

      setIsLoading(true);
      const error = await createPost(formData);
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

  const handleDeleteImage = useMemo(
    () => (index: number) => {
      if (!images) return;
      const convertArray = Array.from(images);
      const eliminarActual = convertArray.filter((_, i) => i !== index);
      const dataTransfer = new DataTransfer();
      eliminarActual.forEach((file) => dataTransfer.items.add(file));
      setImages(dataTransfer.files);
    },
    [images]
  );

  return (
    <Card className="w-full max-w-[600px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardBody className="pb-0 space-y-2">
          <Textarea
            minRows={2}
            isInvalid={!!errors.contenido}
            errorMessage={errors.contenido?.message}
            {...register('contenido')}
            placeholder="Algun problema?"
          />
          {images && images.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {Array.from(images).map((imagen, index) => (
                <ImagePreview
                  key={imagen.name}
                  imagen={imagen}
                  index={index}
                  handleDeleteImage={handleDeleteImage}
                />
              ))}
            </div>
          )}
        </CardBody>
        <CardFooter className="flex justify-between text-default-500">
          <label className="cursor-pointer">
            <ImagePlus />
            <input
              onChange={(e) => setImages(e.target.files)}
              type="file"
              accept="image/*"
              multiple
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
