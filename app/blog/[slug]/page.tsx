import { LeftArrow } from '@/components/ui/icons';
import { Link } from '@nextui-org/link';
import Image from 'next/image';

export default async function Article() {
  return (
    <div className="w-full mt-12 flex flex-col justify-start items-center prose prose-neutral">
      <div className="w-full max-w-4xl">
        <Link className="mb-8" color="foreground" href="/blog">
          <LeftArrow />
          Volver al blog
        </Link>
        <p className="text-sm text-default-500 mb-4">25 Agosto, 2024</p>
        <h1 className="mb-2 font-bold text-4xl">Introducing v2.4.0</h1>

        <Image
          src="https://nextui.org/blog/v2.4.0_2x.jpg"
          className="w-full aspect-video mb-8"
          alt="foto blog"
          width={700}
          height={350}
        />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed ab
          mollitia nam, cumque omnis officiis culpa non voluptatem deserunt
          provident? Nihil harum, velit quidem ad debitis odio aliquam nemo
          animi? Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed ab
          mollitia nam, cumque omnis officiis culpa non voluptatem deserunt
          provident? Nihil harum, velit quidem ad debitis odio aliquam nemo
          animi? Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed ab
          mollitia nam, cumque omnis officiis culpa non voluptatem deserunt
          provident? Nihil harum, velit quidem ad debitis odio aliquam nemo
          animi? Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed ab
          mollitia nam, cumque omnis officiis culpa non voluptatem deserunt
          provident? Nihil harum, velit quidem ad debitis odio aliquam nemo
          animi? Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed ab
          mollitia nam, cumque omnis officiis culpa non voluptatem deserunt
          provident? Nihil harum, velit quidem ad debitis odio aliquam nemo
          animi?
        </p>
      </div>
    </div>
  );
}
