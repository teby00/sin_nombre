'use client';

import { useState } from 'react';

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/navbar';
import { Button } from '@nextui-org/button';
import {
  MessageCircleQuestion,
  MonitorCog,
  ShieldQuestion,
} from 'lucide-react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { logout } from '@/lib/actions/navbar';
import SearchForm from './SearchForm';

interface Props {
  session: {
    isAuth: boolean;
    rol: string | null;
    isAdmin: boolean;
    isStaff: boolean;
  };
}

export default function Nav({ session }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const path = usePathname();

  if (
    path === '/login' ||
    path === '/register' ||
    path.startsWith('/dashboard')
  ) {
    return;
  }

  const handleLogOuth = async () => {
    await logout();
  };

  const menuItems = [
    { name: 'Inicio', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: 'Descargas', href: '/descargas' },
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link aria-label="Ir a inicio" href="/">
            <ShieldQuestion size={36} />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem
          isActive={path === '/'}
          className="data-[active=true]:text-primary-500"
        >
          <Link color="foreground" href="/">
            Inicio
          </Link>
        </NavbarItem>
        <NavbarItem
          isActive={path === '/blog'}
          className="data-[active=true]:text-primary-500"
        >
          <Link href="/blog" aria-current="page">
            Blog
          </Link>
        </NavbarItem>
        <NavbarItem
          isActive={path === '/descargas'}
          className="data-[active=true]:text-primary-500"
        >
          <Link color="foreground" href="/descargas">
            Descargas
          </Link>
        </NavbarItem>
      </NavbarContent>

      {path === '/' && <SearchForm />}

      <NavbarContent justify="end">
        {session.isAuth ? (
          <>
            <NavbarItem className="text-sm hidden lg:flex">
              <Button onClick={handleLogOuth} color="primary" variant="light">
                Cerrar Sesión
              </Button>
            </NavbarItem>
            {session.isStaff ? (
              <NavbarItem>
                <Button
                  aria-label="Ir a panel de administración"
                  as={Link}
                  isIconOnly
                  color="primary"
                  href="/dashboard"
                  variant="shadow"
                >
                  <MonitorCog />
                </Button>
              </NavbarItem>
            ) : (
              <NavbarItem>
                <Button
                  aria-label="Iniciar chat"
                  as={Link}
                  isIconOnly
                  color="primary"
                  href="/chat"
                  variant="shadow"
                >
                  <MessageCircleQuestion />
                </Button>
              </NavbarItem>
            )}
          </>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link href="/login">Iniciar Sesión</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="/register" variant="flat">
                Registro
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarMenu aria-label="Lista de enlaces de navegacion">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="w-full" href={item.href}>
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <Button
            onPress={handleLogOuth}
            variant="light"
            className="text-left pl-0 text-md"
          >
            Cerrar Sesión
          </Button>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
