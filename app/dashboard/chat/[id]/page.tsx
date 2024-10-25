import FormMessage from '@/components/FormMessage';
import ListOfMessagesAdmin from '@/components/ListOfMessagesAdmin';
import { getSession } from '@/lib/getSession';

interface Params {
  id: string;
}

export default async function ChatAdmin({ params }: { params: Params }) {
  const { token } = getSession();
  return (
    <div className="max-w-2xl mx-auto relative h-[85vh]">
      <div
        id="container-chat"
        className="space-y-4 py-8 h-full overflow-y-scroll scrollbar-hide scroll-smooth"
      >
        <ListOfMessagesAdmin id={params.id} token={token} />
      </div>
      <FormMessage id={params.id} isAdmin />
    </div>
  );
}
