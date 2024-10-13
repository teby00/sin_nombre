import { X } from 'lucide-react';
import Image from 'next/image';

export default function ImagePreview({
  imagen,
  index,
  handleDeleteImage,
}: {
  imagen: File;
  index: number;
  handleDeleteImage: (index: number) => void;
}) {
  return (
    <span className="relative [&:hover>img]:blur-sm [&:hover>img]:brightness-50  [&:hover>span]:flex">
      <span
        onClick={() => handleDeleteImage(index)}
        className="z-50 cursor-pointer transition-all duration-200 hidden absolute top-0 right-0 bottom-0 left-0  items-center justify-center"
      >
        <X />
      </span>
      <Image
        width={60}
        height={60}
        className="rounded-lg aspect-square object-cover transition-all duration-200"
        src={URL.createObjectURL(imagen)}
        alt="imagen"
        key={imagen.name}
      />
    </span>
  );
}
