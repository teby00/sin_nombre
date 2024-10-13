'use client';

import { Listbox, ListboxItem } from '@nextui-org/listbox';
import { Users } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export default function SideBar() {
  const router = useRouter();
  const path = usePathname();
  return (
    <nav className="fixed z-20 left-0 h-full w-[300px] bg-[#18181b99] shadow rounded-lg py-4 px-8">
      <h1 className="text-2xl font-bold pb-4">Dashboard</h1>

      <Listbox
        variant="flat"
        onAction={(key) => router.push(key.toString())}
        itemClasses={{
          base: 'aria-selected:bg-primary-500 aria-selected:text-white data-[focus]:bg-primary-500 data-[focus]:text-white',
        }}
      >
        <ListboxItem aria-selected={path === '/dashboard'} key="/dashboard">
          Notificaciones
        </ListboxItem>
        <ListboxItem
          aria-selected={path === '/dashboard/users'}
          key="/dashboard/users"
          startContent={<Users size={20} />}
        >
          Usuarios
        </ListboxItem>
        <ListboxItem
          aria-selected={path === '/dashboard/preguntas'}
          key="/dashboard/preguntas"
          startContent={<Users size={20} />}
        >
          Preguntas
        </ListboxItem>
      </Listbox>
    </nav>
  );
}
