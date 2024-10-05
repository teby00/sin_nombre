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
import { MessageCircleQuestion, Bot, MonitorCog } from 'lucide-react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { logout } from '@/lib/actions/navbar';

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

  if (path === '/login' || path === '/register') {
    return;
  }

  const handleLogOuth = async () => {
    await logout();
  };

  const menuItems = [
    'Profile',
    'Dashboard',
    'Activity',
    'Analytics',
    'System',
    'Deployments',
    'My Settings',
    'Team Settings',
    'Help & Feedback',
    'Log Out',
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/">
            <Bot size={36} />
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
                  as={Link}
                  isIconOnly
                  color="primary"
                  href="/register"
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
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? 'primary'
                  : index === menuItems.length - 1
                  ? 'danger'
                  : 'foreground'
              }
              className="w-full"
              href="#"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
