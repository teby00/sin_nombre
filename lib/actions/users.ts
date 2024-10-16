'use server';

import { Usuario } from '@/app/dashboard/users/types';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export async function addUser(data: Usuario) {
  const token = cookies().get('session')?.value;
  try {
    const response = await fetch(process.env.BACKEND_URL! + 'usuarios/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      if (response.status === 401) {
        return 'No autorizado.';
      }
      if (response.status === 409) {
        return 'Ya existe un usuario con ese nombre.';
      }
      return 'Error al agregar el usuario.';
    }
    revalidateTag('users');
    return;
  } catch (error) {
    return 'Error al conectar con el servidor.';
  }
}

export async function editUser(id: number, data: Usuario) {
  const token = cookies().get('session')?.value;
  try {
    const response = await fetch(process.env.BACKEND_URL! + `usuarios/${id}/`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      if (response.status === 404) {
        return 'Usuario no encontrado.';
      }
      if (response.status === 401) {
        return 'No autorizado.';
      }
      if (response.status === 409) {
        return 'Ya existe un usuario con ese nombre.';
      }
      return 'Error al editar el usuario.';
    }
    revalidateTag('users');
    return;
  } catch (error) {
    return 'Error al conectar con el servidor.';
  }
}

export async function deleteUser(id: number) {
  const token = cookies().get('session')?.value;
  try {
    const response = await fetch(process.env.BACKEND_URL! + `usuarios/${id}/`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      if (response.status === 404) {
        return 'Usuario no encontrado.';
      }
      if (response.status === 401) {
        return 'No autorizado.';
      }
      return 'Error al eliminar el usuario.';
    }
    revalidateTag('users');
    return;
  } catch (error) {
    return 'Error al conectar con el servidor.';
  }
}
