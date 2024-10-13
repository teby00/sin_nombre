import { headers } from 'next/headers';

export function getSession() {
  const headersList = headers();
  const id = headersList.get('x-user-id');
  const rol = headersList.get('x-user-rol');
  const isAdmin = rol === 'ADMIN';
  const isModerador = rol === 'MODERADOR';
  const isStaff = isAdmin || isModerador;
  const isAuth = !!rol;

  return {
    id,
    rol,
    isAdmin,
    isStaff,
    isAuth,
  };
}
