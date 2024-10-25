import CarouselPreguntas from '@/components/CarouselPreguntas';
import FormMessage from '@/components/FormMessage';
import ListOfMessagesUser from '@/components/ListOfMessagesUser';
import { getSession } from '@/lib/getSession';
import { getMensajes } from '@/lib/services/chat';
import { getPreguntas } from '@/lib/services/dashboard';
import { Bot } from 'lucide-react';

export default async function Chat() {
  const { data, error } = await getMensajes();
  const { data: preguntas } = await getPreguntas();
  const { token } = getSession();

  return (
    <div className="max-w-2xl mx-auto relative h-[85vh]">
      {data && preguntas && data.length < 1 && (
        <div className="w-full flex flex-col h-[70vh] justify-center items-center gap-2">
          <Bot size={64} />
          <h2 className="text-2xl font-bold mb-8">En que puedo ayudarte?</h2>
          <CarouselPreguntas preguntas={preguntas} />
        </div>
      )}
      <div
        id="container-chat"
        className="space-y-4 py-16 h-full overflow-y-scroll scrollbar-hide scroll-smooth"
      >
        {error && <p className="text-danger-500">{error}</p>}
        <ListOfMessagesUser token={token} />
      </div>
      <FormMessage />
    </div>
  );
}
