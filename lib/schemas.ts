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

export const OnlyContenidoSchema = object({
  contenido: pipe(
    string('El contenido es requerido'),
    nonEmpty('El contenido es requerido')
  ),
});

export const User = object({
  username: pipe(
    string('El nombre de ususario es requerido'),
    nonEmpty('El nombre de ususario es requerido')
  ),
  password: pipe(
    string('La contraseña es requerida'),
    nonEmpty('La contraseña es requerida')
  ),
  rol: pipe(string('El rol es requerido'), nonEmpty('El rol es requerido')),
});

export const PreguntaFrecuenteSchema = object({
  pregunta: pipe(
    string('La pregunta es requerida'),
    nonEmpty('La pregunta es requerida')
  ),
  respuesta: pipe(
    string('La respuesta es requerida'),
    nonEmpty('La respuesta es requerida')
  ),
});
