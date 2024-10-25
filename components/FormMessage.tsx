'use client';

import { addMessage, addMessageAdmin } from '@/lib/actions/chat';
import { OnlyContenidoSchema } from '@/lib/schemas';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { InferInput } from 'valibot';

export default function FormMessage({
  isAdmin = false,
  id,
}: {
  isAdmin?: boolean;
  id?: string;
}) {
  const { register, handleSubmit, reset } = useForm({
    resolver: valibotResolver(OnlyContenidoSchema),
    defaultValues: {
      contenido: '',
    },
  });

  const OnSubmit = async (
    dataForm: InferInput<typeof OnlyContenidoSchema>
  ): Promise<void> => {
    if (isAdmin && id) {
      const error = await addMessageAdmin(id, dataForm);
      if (error) {
        toast.error(error);
      } else {
        reset();
      }
    } else {
      const error = await addMessage(dataForm);
      if (error) {
        toast.error(error);
      } else {
        reset();
      }
    }
  };

  return (
    <div className="fixed bottom-10 w-full max-w-2xl flex gap-2">
      <form className="w-full" onSubmit={handleSubmit(OnSubmit)}>
        <Input
          {...register('contenido')}
          size="lg"
          placeholder="Escribe tu mensaje"
          endContent={
            <Button type="submit" isIconOnly variant="light">
              <Send />
            </Button>
          }
        />
      </form>
    </div>
  );
}
