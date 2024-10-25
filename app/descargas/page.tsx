import { Button } from '@nextui-org/button';
import { Card, CardBody } from '@nextui-org/card';
import { FileText, DownloadCloud } from 'lucide-react';
import { getArchivos } from '@/lib/services/archivos';
import Link from 'next/link';

export default async function Descargas() {
  const { data, error } = await getArchivos();
  return (
    <div className="w-full lg:px-16 mt-12 px-4">
      <div className="text-center">
        <h1 className="mb-2 font-bold text-4xl">Descargas</h1>
        <h5 className="text-default-500 text-lg">
          Aqui puedes descargar los archivos que necesites.
        </h5>
      </div>
      <div className="mt-10 md:px-40 grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        {error && <p className="text-red-500 text-center">{error}</p>}
        {data?.map((archivo) => (
          <Card key={archivo.id} className="bg-opacity-60">
            <CardBody className="flex flex-row items-center gap-4 p-3">
              <span className="bg-default-200 rounded-[1rem] p-4">
                <FileText size={36} />
              </span>
              <div className="flex flex-col gap-1">
                <h4 className="font-bold text-large">{archivo.descripcion}</h4>
                <span className="flex gap-2 items-center text-default-500">
                  <Link
                    href={process.env.NEXT_PUBLIC_BACKEND_MEDIA! + archivo.file}
                  >
                    <Button
                      isIconOnly
                      size="sm"
                      radius="full"
                      variant="bordered"
                    >
                      <DownloadCloud size={20} />
                    </Button>
                  </Link>
                </span>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
