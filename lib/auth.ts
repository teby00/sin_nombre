import { jwtVerify } from 'jose';

interface TokenPayload {
  id: string;
  rol: string;
  exp: number;
}

export const getJwtSecretKey = (): string => {
  const secret = process.env.JWT_SECRET_KEY;

  if (!secret || secret.length === 0) {
    throw new Error('No se ha definido la variable de entorno JWT_SECRET_KEY');
  }

  return secret;
};

export const verifyAuth = async (token: string) => {
  try {
    const { payload } = await jwtVerify<TokenPayload>(
      token,
      new TextEncoder().encode(getJwtSecretKey()),
      { algorithms: ['HS256'] }
    );
    return payload;
  } catch (error) {
    throw new Error('Error al verificar el token');
  }
};
