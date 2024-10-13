'use client';
import { Button } from '@nextui-org/button';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown';
import { Ellipsis } from 'lucide-react';
export default function CardDropdown({
  userId,
  postUserId,
}: {
  userId: string | null;
  postUserId: string | null;
}) {
  if (userId !== postUserId) return null;

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="light" isIconOnly>
          <Ellipsis />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="edit">Editar</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Eliminar
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
