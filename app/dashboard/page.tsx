import { getNotifications } from '@/lib/services/dashboard';
import { Card, CardBody } from '@nextui-org/card';
import { cn } from '@nextui-org/theme';
import { FilePlus2, MessageCircle } from 'lucide-react';
import { DateTime } from 'luxon';
import Link from 'next/link';

export default async function Dashboard() {
  const { data, error } = await getNotifications();
  return (
    <div className="space-y-4">
      {data && data.length > 0 && (
        <div className="w-[600px] space-y-4">
          <h3 className="w-full text-start text-xl font-semibold">
            Notificaciones
          </h3>
          {data.map((notificacion) => (
            <Link
              key={notificacion.id}
              href={`/post/${notificacion.publicacion}`}
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
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
