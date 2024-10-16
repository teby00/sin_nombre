'use client';

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

import PopDelete from './PopDelete';
import { Archivo } from '@/lib/services/archivos';
import { Link } from '@nextui-org/link';
import ModalDescargas from './ModalDescargas';
import { deleteArchivo } from '@/lib/actions/archivos';

const columns = [
  {
    key: 'descripcion',
    label: 'NOMBRE',
  },
  {
    key: 'file',
    label: 'ARCHIVO',
  },
  {
    key: 'actions',
    label: 'ACCIONES',
  },
];

export default function ListDescargas({ data }: { data: Archivo[] }) {
  const renderCell = useCallback((data: Archivo, columnKey: Key) => {
    const cellValue = data[columnKey as keyof Archivo];

    switch (columnKey) {
      case 'file':
        return (
          <Link href={process.env.NEXT_PUBLIC_BACKEND_MEDIA! + data.file}>
            {cellValue}
          </Link>
        );
      case 'actions':
        return (
          <div className="relative flex items-center justify-center gap-2">
            <ModalDescargas data={data}>
              <button
                type="button"
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <Tooltip content="Editar pregunta">
                  <Edit />
                </Tooltip>
              </button>
            </ModalDescargas>
            <PopDelete
              id={data.id}
              text="Pregunta"
              conection="femenino"
              action={deleteArchivo}
            />
          </div>
        );

      default:
        return cellValue;
    }
  }, []);
  return (
    <>
      <Table aria-label="Tabla de descargas">
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
        <TableBody
          emptyContent="Cuando existan descargas aparecerán aquí."
          items={data}
        >
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
