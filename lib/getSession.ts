import { headers } from 'next/headers';

export function getSession() {
  const headersList = headers();
  const rol = headersList.get('x-user-rol');
  const isAdmin = rol === 'ADMIN';
  const isAuth = !!rol;

  return {
    rol,
    isAdmin,
    isAuth,
  };
}
