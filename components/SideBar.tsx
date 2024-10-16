'use client';

import { logout } from '@/lib/actions/navbar';
import { Button } from '@nextui-org/button';
import { Listbox, ListboxItem } from '@nextui-org/listbox';
import { Tooltip } from '@nextui-org/tooltip';
import {
  Bell,
  BookMarked,
  Download,
  HelpCircle,
  Home,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function SideBar({ isAdmin }: { isAdmin: boolean }) {
  const router = useRouter();
  const path = usePathname();
  return (
    <nav className="fixed flex flex-col z-20 left-0 h-full w-[300px] bg-[#18181b99] shadow rounded-lg py-4 px-8">
      <div className="flex justify-between items-center pb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Tooltip content="Ir a inicio">
          <Button as={Link} href="/" isIconOnly variant="light">
            <Home />
          </Button>
        </Tooltip>
      </div>

      <Listbox
        variant="flat"
        onAction={(key) => router.push(key.toString())}
        className="flex-1 [&>ul]:gap-2"
        itemClasses={{
          base: 'aria-selected:bg-primary-500 aria-selected:text-white data-[focus=true]:bg-primary-500 data-[focus=true]:text-white',
        }}
      >
        <ListboxItem
          aria-selected={path === '/dashboard'}
          key="/dashboard"
          startContent={<Bell size={20} />}
        >
          Notificaciones
        </ListboxItem>
        {isAdmin ? (
          <ListboxItem
            aria-selected={path === '/dashboard/users'}
            key="/dashboard/users"
            startContent={<Users size={20} />}
          >
            Usuarios
          </ListboxItem>
        ) : (
          <></>
        )}
        <ListboxItem
          aria-selected={path === '/dashboard/preguntas'}
          key="/dashboard/preguntas"
          startContent={<HelpCircle size={20} />}
        >
          Preguntas Frecuentes
        </ListboxItem>
        <ListboxItem
          aria-selected={path === '/dashboard/blog'}
          key="/dashboard/blog"
          startContent={<BookMarked size={20} />}
        >
          Blog
        </ListboxItem>
        <ListboxItem
          aria-selected={path === '/dashboard/descargas'}
          key="/dashboard/descargas"
          startContent={<Download size={20} />}
        >
          Descargas
        </ListboxItem>
      </Listbox>
      <Button onPress={() => logout()} className="w-full" variant="light">
        Cerrar sesión
      </Button>
    </nav>
  );
}
