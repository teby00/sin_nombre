import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Dot } from 'lucide-react';
import { DateTime } from 'luxon';
import CardDropdown from './CardDropdown';

interface PostsProps {
  id: number;
  username: string;
  fecha: string;
  contenido: string;
  userId: string | null;
  footer?: React.ReactNode;
}

export default function CardPosts({
  id,
  username,
  fecha,
  contenido,
  userId,
  footer,
}: PostsProps) {
  return (
    <Card className="w-[600px] bg-opacity-60">
      <CardHeader className="justify-between">
        <div className="flex items-center">
          <span>@{username}</span>
          <Dot />
          <span className="text-sm">
            {DateTime.fromISO(fecha).toRelative()}
          </span>
        </div>
        <CardDropdown userId={userId} postUserId={id.toString()} />
      </CardHeader>
      <CardBody>{contenido}</CardBody>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}
