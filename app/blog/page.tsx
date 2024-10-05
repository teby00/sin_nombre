import { Card, CardBody, CardFooter } from '@nextui-org/card';
import Image from 'next/image';

export default async function Blog() {
  return (
    <div className="w-full lg:px-16 mt-12">
      <div className="text-center">
        <h1 className="mb-2 font-bold text-4xl">Últimas noticias</h1>
        <h5 className="text-default-500 text-lg">
          Mantente al tanto de las últimas noticias de ciberseguridad.
        </h5>
      </div>
      <div className="mt-10 grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        <Card className="py-4">
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src="https://nextui.org/images/hero-card-complete.jpeg"
              width={400}
              height={270}
            />
          </CardBody>
          <CardFooter className="block">
            <h4 className="font-bold text-large">Frontend Radio</h4>
            <p className="text-sm text-default-500">25 Agosto, 2024</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
