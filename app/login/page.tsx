import { Link } from '@nextui-org/link';
import LoginForm from './client.form';

export default async function Login() {
  return (
    <div
      className="grid place-items-center"
      style={{ height: 'calc(100vh - 120px)' }}
    >
      <div className="w-[300px] flex flex-col">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          Iniciar Sesión
        </h1>
        <LoginForm />
        <span className="flex justify-between items-center mt-4 gap-2 text-sm">
          <p>No tienes cuenta?</p>
          <Link href="/register" className="cursor-pointer">
            Regístrate
          </Link>
        </span>
      </div>
    </div>
  );
}
