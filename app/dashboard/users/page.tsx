import ListUsuarios from '@/components/ListUsuarios';
import ModalUser from '@/components/ModalUser';
import { getUsers } from '@/lib/services/dashboard';
import { Button } from '@nextui-org/button';
import { UserPlus2 } from 'lucide-react';

export default async function DashboardUsers() {
  const { data, error } = await getUsers();
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl text-start font-bold">Usuarios</h1>
        <ModalUser>
          <Button
            color="primary"
            variant="shadow"
            startContent={<UserPlus2 size={20} />}
          >
            Agregar
          </Button>
        </ModalUser>
      </div>
      {data && <ListUsuarios data={data} />}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
