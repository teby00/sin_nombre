'use client';

import { Usuario } from '@/app/dashboard/users/types';
import { addUser, editUser } from '@/lib/actions/users';
import { User } from '@/lib/schemas';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/modal';
import { Select, SelectItem } from '@nextui-org/select';
import { Infer } from 'next/dist/compiled/superstruct';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function ModalUser({
  children,
  data,
}: {
  children: React.ReactElement<{ onClick: () => void }>;
  data?: Usuario;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: valibotResolver(User),
    defaultValues: {
      username: data?.username || '',
      password: '',
      rol: data?.rol || '',
    },
  });

  const onSubmit = async (dataForm: Infer<typeof User>) => {
    setIsLoading(true);
    if (!data) {
      const error = await addUser(dataForm);
      if (!error) {
        setIsLoading(false);
        toast.success('Usuario agregado exitosamente');
        onOpenChange();
      }
      setIsLoading(false);
      setError(error);
    } else {
      const error = await editUser(data.id, dataForm);
      if (!error) {
        setIsLoading(false);
        toast.success('Usuario editado exitosamente');
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
                {data ? 'Editar' : 'Agregar'} Usuario
                <p className="text-red-500">{error}</p>
              </ModalHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                  <Input
                    isInvalid={!!errors?.username}
                    errorMessage={errors.username?.message}
                    {...register('username')}
                    placeholder="Nombre"
                  />
                  <Select
                    placeholder="Seleccione un rol"
                    {...register('rol')}
                    isInvalid={!!errors.rol}
                    errorMessage={errors.rol?.message}
                  >
                    <SelectItem key="ADMIN">Administrador</SelectItem>
                    <SelectItem key="MODERADOR">Moderador</SelectItem>
                    <SelectItem key="USUARIO">Usuario</SelectItem>
                  </Select>
                  <Input
                    {...register('password')}
                    isInvalid={!!errors.password}
                    errorMessage={errors.password?.message}
                    placeholder="Contraseña"
                    type="password"
                    name="password"
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
