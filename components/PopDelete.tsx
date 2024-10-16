'use client';

import { useCallback, useState } from 'react';
import { Button } from '@nextui-org/button';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { Tooltip } from '@nextui-org/tooltip';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function PopDelete({
  id,
  action,
  text,
  conection = 'masculino',
}: {
  id: number;
  action: (id: number) => Promise<string | undefined>;
  text: string;
  conection: 'masculino' | 'femenino';
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = useCallback(async () => {
    setIsLoading(true);
    const error = await action(id);
    if (!error) {
      toast.success(
        `${text} ${
          conection === 'masculino' ? ' eliminado' : ' eliminada'
        } exitosamente
      `
      );
      setIsOpen(false);
      setIsLoading(false);
    } else {
      toast.error(error);
      setIsLoading(false);
    }
  }, [text, conection, action, id]);

  return (
    <Popover
      isOpen={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
      placement="bottom-end"
      backdrop="blur"
    >
      <PopoverTrigger>
        <span className="text-lg text-danger cursor-pointer active:opacity-50">
          <Tooltip color="danger" content={`Eliminar ${text}`}>
            <Trash2 />
          </Tooltip>
        </span>
      </PopoverTrigger>
      <PopoverContent className="p-4 w-[350px]">
        <>
          <h4 className="text-lg font-bold mb-1">
            Deseas eliminar {conection === 'masculino' ? 'el' : 'la'} {text}?
          </h4>
          <p className="text-default-500 mb-4">
            Esta acción no se puede deshacer.
          </p>
          <div className="flex w-full justify-between gap-2">
            <Button
              onPress={() => setIsOpen(false)}
              className="w-full"
              size="sm"
            >
              Cancelar
            </Button>
            <Button
              onPress={handleDelete}
              isLoading={isLoading}
              className="w-full"
              size="sm"
              color="danger"
            >
              Eliminar
            </Button>
          </div>
        </>
      </PopoverContent>
    </Popover>
  );
}
