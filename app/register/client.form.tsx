'use client';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';

import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { LoginSchema } from '@/lib/schemas';
import { InferInput } from 'valibot';

import { register as registerUser } from './actions';
import { useState } from 'react';

export default function RegisterForm() {
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: valibotResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (
    dataForm: InferInput<typeof LoginSchema>
  ): Promise<void> => {
    try {
      setIsLoading(true);
      const error = await registerUser(dataForm);
      if (error) {
        setError(error);
      }
    } catch (e) {
      setError('Error al conectar con el servidor.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-3">
      {error && (
        <blockquote className="border px-4 py-3 rounded-xl [&amp;>p]:m-0 border-danger-100 bg-danger-50/20 my-2">
          {error}
        </blockquote>
      )}
      <Input
        {...register('username')}
        isInvalid={!!errors.username}
        errorMessage={errors.username?.message}
        placeholder="usuario"
      />
      <Input
        {...register('password')}
        isInvalid={!!errors.password}
        errorMessage={errors.password?.message}
        placeholder="contraseña"
        type="password"
      />
      <Button color="primary" type="submit" isLoading={isLoading}>
        Enviar
      </Button>
    </form>
  );
}
