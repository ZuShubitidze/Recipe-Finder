"use client";

import { Input } from "../ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function SearchBox() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Input
      defaultValue={searchParams.get("query")?.toString()}
      onChange={(e) => handleSearch(e.target.value)}
      placeholder="Search recipes by name"
      className="my-4"
    />
  );
}
