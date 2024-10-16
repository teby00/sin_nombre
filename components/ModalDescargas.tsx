'use client';

import { addArchivo, editArchivo } from '@/lib/actions/archivos';
import { ArchivoSchema } from '@/lib/schemas';
import { Archivo } from '@/lib/services/archivos';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { Button } from '@nextui-org/button';
import { Card } from '@nextui-org/card';
import { Input } from '@nextui-org/input';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/modal';
import { FilePlus, FileText, X } from 'lucide-react';
import { Infer } from 'next/dist/compiled/superstruct';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function ModalDescargas({
  children,
  data,
}: {
  children: React.ReactElement<{ onClick: () => void }>;
  data?: Archivo;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [archivo, setArchivo] = useState<File | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: valibotResolver(ArchivoSchema),
    defaultValues: {
      descripcion: data?.descripcion || '',
    },
  });

  const onSubmit = async (dataForm: Infer<typeof ArchivoSchema>) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('archivo', JSON.stringify(dataForm));
    if (archivo) {
      formData.append('file', archivo);
    }
    if (!data) {
      const error = await addArchivo(formData);
      if (!error) {
        setIsLoading(false);
        toast.success('Archivo agregado exitosamente');
        onOpenChange();
        reset();
        handleDelete();
      }
      setIsLoading(false);
      setError(error);
    } else {
      const error = await editArchivo(data.id, formData);
      if (!error) {
        setIsLoading(false);
        toast.success('Archivo editado exitosamente');
        onOpenChange();
        reset();
        handleDelete();
      }
      setIsLoading(false);
      setError(error);
    }
  };

  const handleDelete = () => {
    setArchivo(undefined);
  };

  return (
    <>
      {React.cloneElement(children, {
        onClick: onOpen,
      })}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
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
                      isInvalid={!!errors?.descripcion}
                      errorMessage={errors.descripcion?.message}
                      {...register('descripcion')}
                      placeholder="Nombre"
                    />
                    {archivo && (
                      <Card className="flex flex-row justify-between items-center p-2">
                        <div className="flex gap-2 items-center line-clamp-1 text-default-700">
                          <FileText size={36} />
                          <p>{archivo.name}</p>
                        </div>
                        <X className="cursor-pointer" onClick={handleDelete} />
                      </Card>
                    )}
                    {!archivo && (
                      <label className="cursor-pointer w-full border-dashed border-default-300 text-default-400 rounded-lg aspect-video border-2 flex flex-col justify-center items-center">
                        <FilePlus />
                        <p>Agregar archivo</p>
                        <input
                          value={archivo}
                          onChange={(e) => setArchivo(e.target.files?.[0])}
                          type="file"
                          accept="image/*"
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
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
