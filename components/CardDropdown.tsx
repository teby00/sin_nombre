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
  id,
  userId,
  postUserId,
  deleteAction,
}: {
  id: number;
  userId: string | null;
  postUserId: string | null;
  deleteAction?: (id: number) => Promise<string | void>;
}) {
  if (userId !== postUserId) return null;
  if (!deleteAction) return null;

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="light" isIconOnly>
          <Ellipsis />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Actions">
        <DropdownItem
          onPress={() => deleteAction(id)}
          key="delete"
          className="text-danger"
          color="danger"
        >
          Eliminar
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
