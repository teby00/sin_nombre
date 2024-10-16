import deleteNotificaciones from '@/lib/actions/notificaciones';
import { getNotifications } from '@/lib/services/dashboard';
import { Button } from '@nextui-org/button';
import { Card, CardBody } from '@nextui-org/card';
import { cn } from '@nextui-org/theme';
import { BellOff, BellRing, FilePlus2, MessageCircle } from 'lucide-react';
import { DateTime } from 'luxon';
import Link from 'next/link';

export default async function Dashboard() {
  const { data, error } = await getNotifications();

  return (
    <div className="flex flex-col space-y-4">
      <div className="w-[600px] flex justify-between items-center">
        <h1 className="text-3xl text-start font-bold">Notificaciones</h1>
        <form action={deleteNotificaciones}>
          <Button
            type="submit"
            isIconOnly
            variant="light"
            className="cursor-pointer"
          >
            <BellOff />
          </Button>
        </form>
      </div>
      <div className="flex flex-col space-y-4">
        {data?.map((notificacion) => (
          <Link
            key={notificacion.id}
            href={`/post/${notificacion.publicacion.id}`}
          >
            <Card className="w-[600px] bg-opacity-60">
              <CardBody className="flex-row items-center gap-4">
                <span
                  className={cn(
                    'rounded-[1rem] p-4',
                    notificacion.tipo === 'PUBLICACION'
                      ? 'bg-green-500'
                      : 'bg-blue-500'
                  )}
                >
                  {notificacion.tipo === 'PUBLICACION' && (
                    <FilePlus2 size={36} />
                  )}
                  {notificacion.tipo === 'COMENTARIO' && (
                    <MessageCircle size={36} />
                  )}
                </span>
                <span>
                  <p className="text-sm text-default-500">
                    {DateTime.fromISO(notificacion.fecha).toRelative()}
                  </p>
                  {notificacion.tipo === 'PUBLICACION' && (
                    <p>
                      {notificacion.de.username} creó una nueva publicación.
                    </p>
                  )}
                  {notificacion.tipo === 'COMENTARIO' && (
                    <p>
                      {notificacion.de.username} ha comentado tu publicación.
                    </p>
                  )}
                </span>
              </CardBody>
            </Card>
          </Link>
        ))}
        {data && data?.length < 1 && (
          <div className="mt-20 w-[600px] flex flex-col gap-4 justify-center items-center">
            <BellRing size={36} />
            <p className="text-default-500">
              Cuando tengas notificaciones aparecerán aquí.
            </p>
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}
