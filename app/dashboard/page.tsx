import deleteNotificaciones from '@/lib/actions/notificaciones';
import { getAllChats, getNotifications } from '@/lib/services/dashboard';
import { Button } from '@nextui-org/button';
import { Card, CardBody } from '@nextui-org/card';
import { cn } from '@nextui-org/theme';
import {
  BellOff,
  BellRing,
  FilePlus2,
  MessageCircle,
  User,
} from 'lucide-react';
import { DateTime } from 'luxon';
import Link from 'next/link';

export default async function Dashboard() {
  const { data, error } = await getNotifications();
  const { data: chats } = await getAllChats();

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl text-start font-bold">Notificaciones</h1>
          <form action={deleteNotificaciones}>
            <Button
              aria-label="Borrar notificaciones"
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
              href={
                notificacion.tipo === 'MENSAJE'
                  ? `/dashboard/chat/${notificacion.chat.id}`
                  : `/post/${notificacion.publicacion.id}`
              }
            >
              <Card className="w-full bg-opacity-60">
                <CardBody className="flex-row items-center gap-4">
                  <span
                    className={cn(
                      'rounded-[1rem] p-4',
                      notificacion.tipo === 'PUBLICACION' && 'bg-green-500',
                      notificacion.tipo === 'COMENTARIO' && 'bg-blue-500',
                      notificacion.tipo === 'MENSAJE' && 'bg-danger-500'
                    )}
                  >
                    {notificacion.tipo === 'PUBLICACION' && (
                      <FilePlus2 size={36} />
                    )}
                    {notificacion.tipo === 'COMENTARIO' && (
                      <MessageCircle size={36} />
                    )}
                    {notificacion.tipo === 'MENSAJE' && <BellRing size={36} />}
                  </span>
                  <span>
                    <p className="text-sm text-default-500">
                      {DateTime.fromISO(notificacion.fecha).toRelative({
                        locale: 'es',
                      })}
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
                    {notificacion.tipo === 'MENSAJE' && (
                      <p>
                        Tienes un nuevo mensaje de {notificacion.de.username}
                      </p>
                    )}
                  </span>
                </CardBody>
              </Card>
            </Link>
          ))}
          {data && data?.length < 1 && (
            <div className="mt-20 w-full flex flex-col gap-4 justify-center items-center">
              <BellRing size={36} />
              <p className="text-default-500">
                Cuando tengas notificaciones aparecerán aquí.
              </p>
            </div>
          )}
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl text-start font-bold">Chats</h1>
        </div>
        <div className="flex flex-col space-y-4">
          {chats &&
            chats.map((chat) => (
              <Link key={chat.id} href={`/dashboard/chat/${chat.id}`}>
                <Card
                  aria-label="asdasdas"
                  aria-labelledby="asdasd"
                  className="w-full bg-opacity-60"
                >
                  <CardBody className="flex-row items-center gap-4">
                    <span className="rounded-[1rem] aspect-square p-2 bg-danger-500">
                      <User size={26} />
                    </span>
                    <div className="w-full">
                      <span className="flex justify-between items-center w-full">
                        <p>{chat.usuario.username}</p>
                        <p className="text-sm text-default-500">
                          {DateTime.fromISO(
                            chat.last_message_fecha
                          ).toRelative()}
                        </p>
                      </span>
                      <span className="text-default-500">
                        {chat.last_message_contenido}
                      </span>
                    </div>
                  </CardBody>
                </Card>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
