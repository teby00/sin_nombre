import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Button as={Link} href="/blog" color="primary" variant="shadow">
          Aquiiiiii
        </Button>
      </main>
    </div>
  );
}
