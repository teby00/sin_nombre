import ListDescargas from '@/components/ListDescargas';
import ModalDescargas from '@/components/ModalDescargas';
import { getArchivos } from '@/lib/services/archivos';
import { Button } from '@nextui-org/button';
import { CirclePlus } from 'lucide-react';

export default async function DashboardDescargas() {
  const { data, error } = await getArchivos();
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl text-start font-bold">Descargas</h1>
        <ModalDescargas>
          <Button
            color="primary"
            variant="shadow"
            startContent={<CirclePlus size={20} />}
          >
            Agregar
          </Button>
        </ModalDescargas>
      </div>
      {data && <ListDescargas data={data} />}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
