'use client';

import { Input } from '@nextui-org/input';
import { NavbarContent, NavbarItem } from '@nextui-org/navbar';
import { Search } from 'lucide-react';
import { useQueryState } from 'nuqs';

export default function SearchForm() {
  const [query, setQuery] = useQueryState('q', { shallow: false });
  return (
    <NavbarContent className="pl-8">
      <NavbarItem>
        <Input
          value={query || ''}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar"
          variant="bordered"
          endContent={<Search className="text-default-500 cursor-pointer" />}
        />
      </NavbarItem>
    </NavbarContent>
  );
}
