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
import { Edit, Eye } from 'lucide-react';
import { Key, useCallback } from 'react';

import PopDelete from './PopDelete';
import ModalArticulos from './ModalArticulos';
import { DateTime } from 'luxon';
import { Articulo } from '@/lib/services/blog';
import Link from 'next/link';
import { deleteArticulo } from '@/lib/actions/articulos';

const columns = [
  {
    key: 'fecha',
    label: 'FECHA',
  },
  {
    key: 'titulo',
    label: 'TITULO',
  },
  {
    key: 'actions',
    label: 'ACCIONES',
  },
];

export default function ListPreguntas({ data }: { data: Articulo[] }) {
  const renderCell = useCallback((data: Articulo, columnKey: Key) => {
    const cellValue = data[columnKey as keyof Articulo];

    switch (columnKey) {
      case 'fecha':
        return DateTime.fromISO(data.fecha).toRelative();
      case 'actions':
        return (
          <div className="relative flex items-center justify-center gap-4">
            <Link
              href={`/blog/${data.slug}`}
              className="text-lg text-default-400 cursor-pointer active:opacity-50"
            >
              <Tooltip content="Ver">
                <Eye />
              </Tooltip>
            </Link>
            <ModalArticulos data={data}>
              <button
                type="button"
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <Tooltip content="Editar artículo">
                  <Edit />
                </Tooltip>
              </button>
            </ModalArticulos>
            <PopDelete
              id={data.id}
              text="Artículo"
              conection="masculino"
              action={deleteArticulo}
            />
          </div>
        );

      default:
        return cellValue;
    }
  }, []);
  return (
    <>
      <Table aria-label="Tabla de preguntas frecuentes">
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
          emptyContent="Cuando existan preguntas frecuentes aparecerán aquí."
          items={data}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(item, columnKey) as React.ReactNode}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
