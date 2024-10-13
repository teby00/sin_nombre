import ListPreguntas from '@/components/ListPreguntas';
import ModalPreguntas from '@/components/ModalPreguntas';
import { getPreguntas } from '@/lib/services/dashboard';
import { Button } from '@nextui-org/button';
import { UserPlus2 } from 'lucide-react';

export default async function DashboardPreguntas() {
  const { data, error } = await getPreguntas();
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl text-start font-bold">Preguntas Frecuentes</h1>
        <ModalPreguntas>
          <Button
            color="primary"
            variant="shadow"
            startContent={<UserPlus2 size={20} />}
          >
            Agregar
          </Button>
        </ModalPreguntas>
      </div>
      {data && <ListPreguntas data={data} />}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
