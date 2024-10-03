import { nonEmpty, object, pipe, string } from 'valibot';

export const LoginSchema = object({
  username: pipe(
    string('El nombre de ususario es requerido'),
    nonEmpty('El nombre de ususario es requerido')
  ),
  password: pipe(
    string('La contraseña es requerida'),
    nonEmpty('La contraseña es requerida')
  ),
});
