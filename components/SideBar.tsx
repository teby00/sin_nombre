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
  LogOut,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const navigation = [
  { name: 'Notificaciones', href: '/dashboard', icon: Bell },
  {
    name: 'Preguntas Frecuentes',
    href: '/dashboard/preguntas',
    icon: HelpCircle,
  },
  { name: 'Blog', href: '/dashboard/blog', icon: BookMarked },
  { name: 'Descargas', href: '/dashboard/descargas', icon: Download },
  { name: 'Usuarios', href: '/dashboard/users', icon: Users, needAdmin: true },
];

export default function SideBar({ isAdmin }: { isAdmin: boolean }) {
  const router = useRouter();
  const path = usePathname();
  return (
    <nav className="fixed flex flex-col z-20 left-0 h-full w-fit md:w-[300px] bg-[#18181b99] shadow rounded-lg py-4 px-2 md:px-8">
      <div className="flex justify-between items-center pb-4">
        <h1 className="hidden md:block text-2xl font-bold">Panel</h1>
        <Tooltip content="Ir a inicio">
          <Button
            aria-label="Ir a inicio"
            as={Link}
            href="/"
            isIconOnly
            variant="light"
          >
            <Home />
          </Button>
        </Tooltip>
      </div>

      <Listbox
        aria-label="Navegación lateral"
        variant="flat"
        onAction={(key) => router.push(key.toString())}
        className="flex-1 [&>ul]:gap-2"
        itemClasses={{
          base: 'aria-selected:bg-primary-500 aria-selected:text-white data-[focus=true]:bg-primary-500 data-[focus=true]:text-white',
        }}
      >
        {navigation.map((item) =>
          item.needAdmin && !isAdmin ? (
            <></>
          ) : (
            <ListboxItem
              key={item.href}
              aria-label={item.name}
              aria-selected={path === item.href}
              startContent={<item.icon size={20} />}
            >
              <span className="hidden md:block">{item.name}</span>
            </ListboxItem>
          )
        )}
      </Listbox>
      <Button
        onPress={() => logout()}
        className="w-full"
        variant="light"
        isIconOnly
        startContent={<LogOut className="md:hidden" />}
      >
        <span className="hidden md:block">Cerrar sesión</span>
      </Button>
    </nav>
  );
}
