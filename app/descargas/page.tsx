import { Button } from '@nextui-org/button';
import { Card, CardBody } from '@nextui-org/card';
import { Chip } from '@nextui-org/chip';
import { FileText, DownloadCloud, Scale } from 'lucide-react';

export default async function Descargas() {
  return (
    <div className="w-full lg:px-16 mt-12">
      <div className="text-center">
        <h1 className="mb-2 font-bold text-4xl">Descargas</h1>
        <h5 className="text-default-500 text-lg">
          Aqui puedes descargar los archivos que necesites.
        </h5>
      </div>
      <div className="mt-10 grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        <Card>
          <CardBody className="flex flex-row items-center gap-4 p-3">
            <span className="bg-default-200 rounded-[1rem] p-4">
              <FileText size={36} />
            </span>
            <div className="flex flex-col gap-1">
              <h4 className="font-bold text-large">Folleto de prueba</h4>
              <span className="flex gap-2 items-center text-default-500">
                <Chip variant="bordered" startContent={<Scale size={16} />}>
                  2 mb
                </Chip>
                <Button isIconOnly size="sm" radius="full" variant="bordered">
                  <DownloadCloud size={20} />
                </Button>
              </span>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
