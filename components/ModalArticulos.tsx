'use client';

import { addArticulo, editArticulo } from '@/lib/actions/articulos';
import { ArticuloSchema } from '@/lib/schemas';
import { Articulo } from '@/lib/services/blog';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { Button } from '@nextui-org/button';
import { Input, Textarea } from '@nextui-org/input';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/modal';
import { ImagePlus, X } from 'lucide-react';
import { Infer } from 'next/dist/compiled/superstruct';
import Image from 'next/image';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function ModalArticulos({
  children,
  data,
}: {
  children: React.ReactElement<{ onClick: () => void }>;
  data?: Articulo;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [images, setImages] = useState<File | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: valibotResolver(ArticuloSchema),
    defaultValues: {
      titulo: data?.titulo || '',
      contenido: data?.contenido || '',
    },
  });

  const onSubmit = async (dataForm: Infer<typeof ArticuloSchema>) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('articulo', JSON.stringify(dataForm));
    if (images) {
      formData.append('image', images);
    }
    if (!data) {
      const error = await addArticulo(formData);
      if (!error) {
        setIsLoading(false);
        toast.success('Pregunta agregada exitosamente');
        onOpenChange();
        reset();
        handleDeleteImage();
      }
      setIsLoading(false);
      setError(error);
    } else {
      const error = await editArticulo(data.id, formData);
      if (!error) {
        setIsLoading(false);
        toast.success('Pregunta editada exitosamente');
        onOpenChange();
        reset();
        handleDeleteImage();
      }
      setIsLoading(false);
      setError(error);
    }
  };

  const handleDeleteImage = () => {
    setImages(undefined);
  };

  return (
    <>
      {React.cloneElement(children, {
        onClick: onOpen,
      })}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col">
                {data ? 'Editar' : 'Agregar'} Artículo
                <p className="text-red-500">{error}</p>
              </ModalHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody className="flex flex-row gap-4">
                  <div className="w-full space-y-4">
                    <Input
                      isInvalid={!!errors?.titulo}
                      errorMessage={errors.titulo?.message}
                      {...register('titulo')}
                      placeholder="Titulo"
                    />
                    {images && (
                      <div className="relative">
                        <span
                          onClick={handleDeleteImage}
                          className="cursor-pointer absolute top-4 right-4 items-center justify-center"
                        >
                          <X />
                        </span>
                        <Image
                          src={URL.createObjectURL(images)}
                          alt="imagen"
                          width={400}
                          height={400}
                          className="w-full aspect-video rounded-lg"
                        />
                      </div>
                    )}
                    {!images && (
                      <label className="cursor-pointer w-full border-dashed border-default-300 text-default-400 rounded-lg aspect-video border-2 flex justify-center items-center">
                        <ImagePlus />
                        <input
                          value={images}
                          onChange={(e) => setImages(e.target.files?.[0])}
                          type="file"
                          accept="image/*"
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  <Textarea
                    {...register('contenido')}
                    isInvalid={!!errors.contenido}
                    errorMessage={errors.contenido?.message}
                    placeholder="Contenido"
                    className="h-full"
                    minRows={12}
                    maxRows={12}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button color="primary" type="submit" isLoading={isLoading}>
                    {data ? 'Editar' : 'Agregar'}
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
