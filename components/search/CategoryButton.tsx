"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";

export function CategoryButton({ category }: { category: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const currentCategory = searchParams.get("category");

  function handleClick() {
    const params = new URLSearchParams(searchParams);
    // Toggle: If clicking the same category, clear it.
    if (currentCategory === category) {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Button
      onClick={handleClick}
      variant={currentCategory === category ? "default" : "outline"}
    >
      {category}
    </Button>
  );
}
