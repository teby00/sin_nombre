'use client';

import { Usuario } from '@/app/dashboard/users/types';
import { Chip, ChipProps } from '@nextui-org/chip';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table';
import { Tooltip } from '@nextui-org/tooltip';
import { Edit } from 'lucide-react';
import { Key, useCallback } from 'react';
import ModalUser from './ModalUser';

import PopDelete from './PopDelete';
import { deleteUser } from '@/lib/actions/users';

const columns = [
  {
    key: 'username',
    label: 'USUARIO',
  },
  {
    key: 'rol',
    label: 'ROL',
  },
  {
    key: 'actions',
    label: 'ACCIONES',
  },
];

const ColorRoles = {
  ADMIN: 'secondary',
  MODERADOR: 'primary',
  USUARIO: 'success',
};

export default function ListUsuarios({ data }: { data: Usuario[] }) {
  const renderCell = useCallback((data: Usuario, columnKey: Key) => {
    const cellValue = data[columnKey as keyof Usuario];

    switch (columnKey) {
      case 'rol':
        return (
          <Chip
            variant="bordered"
            size="sm"
            color={
              ColorRoles[
                data.rol as keyof typeof ColorRoles
              ] as ChipProps['color']
            }
          >
            {cellValue}
          </Chip>
        );
      case 'actions':
        return (
          <div className="relative flex items-center justify-center gap-2">
            <ModalUser data={data}>
              <button
                type="button"
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <Tooltip content="Edit user">
                  <Edit />
                </Tooltip>
              </button>
            </ModalUser>
            <PopDelete
              id={data.id}
              text="Usuario"
              conection="masculino"
              action={deleteUser}
            />
          </div>
        );

      default:
        return cellValue;
    }
  }, []);
  return (
    <>
      <Table aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              align={column.key === 'actions' ? 'center' : 'start'}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={data}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
