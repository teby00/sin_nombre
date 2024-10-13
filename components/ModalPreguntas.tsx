'use client';

import { PreguntaFrecuente } from '@/app/dashboard/preguntas/types';
import { addPregunta, editPregunta } from '@/lib/actions/preguntas';
import { PreguntaFrecuenteSchema } from '@/lib/schemas';
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
import { Infer } from 'next/dist/compiled/superstruct';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function ModalPreguntas({
  children,
  data,
}: {
  children: React.ReactElement<{ onClick: () => void }>;
  data?: PreguntaFrecuente;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: valibotResolver(PreguntaFrecuenteSchema),
    defaultValues: {
      pregunta: data?.pregunta || '',
      respuesta: data?.respuesta || '',
    },
  });

  const onSubmit = async (dataForm: Infer<typeof PreguntaFrecuenteSchema>) => {
    setIsLoading(true);
    if (!data) {
      const error = await addPregunta(dataForm);
      if (!error) {
        setIsLoading(false);
        toast.success('Pregunta agregada exitosamente');
        onOpenChange();
      }
      setIsLoading(false);
      setError(error);
    } else {
      const error = await editPregunta(data.id, dataForm);
      if (!error) {
        setIsLoading(false);
        toast.success('Pregunta editada exitosamente');
        onOpenChange();
      }
      setIsLoading(false);
      setError(error);
    }
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
              <ModalHeader className="flex flex-col gap-1">
                {data ? 'Editar' : 'Agregar'} Pregunta Frecuente
                <p className="text-red-500">{error}</p>
              </ModalHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                  <Input
                    isInvalid={!!errors?.pregunta}
                    errorMessage={errors.pregunta?.message}
                    {...register('pregunta')}
                    placeholder="Pregunta"
                  />

                  <Textarea
                    {...register('respuesta')}
                    isInvalid={!!errors.respuesta}
                    errorMessage={errors.respuesta?.message}
                    placeholder="Respuesta"
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
