'use client';

import { Mensaje } from '@/lib/services/chat';
import { cn } from '@nextui-org/theme';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ListOfMessagesAdmin({
  id,
  token,
}: {
  id: string;
  token?: string;
}) {
  const [data, setData] = useState<Mensaje[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      fetch(process.env.NEXT_PUBLIC_BACKEND_MEDIA + '/api/chat/' + id + '/', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((newData) => {
          setData(newData);
          if (JSON.stringify(newData).length !== JSON.stringify(data).length) {
            const element = document.getElementById('container-chat');
            if (element) {
              element.scrollTop = element.scrollHeight;
            }
          }
          if (loading) {
            setLoading(false);
          }
        });
    }, 1000);
  }, [id, token, data, loading]);

  return (
    <>
      {data &&
        data.length > 0 &&
        data.map((mensaje) => (
          <div
            key={mensaje.id}
            className={cn(
              'w-full flex',
              mensaje.de === 'ADMIN' ? 'justify-end' : 'justify-start'
            )}
          >
            <div
              className={cn(
                'w-fit max-w-[30rem] px-4 py-2 text-lg font-semibold rounded-[1rem] shadow-md',
                mensaje.de === 'USUARIO' ? 'bg-primary-500' : 'bg-[#27272a]'
              )}
            >
              <p>{mensaje.contenido}</p>
            </div>
          </div>
        ))}
      {loading && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader2 className="text-primary-500 animate-spin" />
        </div>
      )}
    </>
  );
}
