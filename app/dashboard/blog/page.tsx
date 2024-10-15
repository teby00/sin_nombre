import ListArticulos from '@/components/ListArticulos';
import ModalArticulos from '@/components/ModalArticulos';
import { getArticulos } from '@/lib/services/blog';
import { Button } from '@nextui-org/button';
import { CirclePlus } from 'lucide-react';

export default async function DashboardPreguntas() {
  const { data, error } = await getArticulos();
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl text-start font-bold">Blog</h1>
        <ModalArticulos>
          <Button
            color="primary"
            variant="shadow"
            startContent={<CirclePlus size={20} />}
          >
            Agregar
          </Button>
        </ModalArticulos>
      </div>
      {data && <ListArticulos data={data} />}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
