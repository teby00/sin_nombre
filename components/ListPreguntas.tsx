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
import { PreguntaFrecuente } from '@/app/dashboard/preguntas/types';
import ModalPreguntas from './ModalPreguntas';
import { deletePregunta } from '@/lib/actions/preguntas';

const columns = [
  {
    key: 'pregunta',
    label: 'PREGUNTA',
  },
  {
    key: 'respuesta',
    label: 'RESPUESTA',
  },
  {
    key: 'actions',
    label: 'ACCIONES',
  },
];

export default function ListPreguntas({ data }: { data: PreguntaFrecuente[] }) {
  const renderCell = useCallback((data: PreguntaFrecuente, columnKey: Key) => {
    const cellValue = data[columnKey as keyof PreguntaFrecuente];

    switch (columnKey) {
      case 'actions':
        return (
          <div className="relative flex items-center justify-center gap-2">
            <ModalPreguntas data={data}>
              <button
                type="button"
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <Tooltip content="Edit user">
                  <Edit />
                </Tooltip>
              </button>
            </ModalPreguntas>
            <PopDelete
              id={data.id}
              text="Pregunta"
              conection="femenino"
              action={deletePregunta}
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
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
