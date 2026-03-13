"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { string } from "zod/v4";

export default function Search({ placeholder }: { placeholder: string }) {
  //get the current search param from URL
  const searchParams = useSearchParams();
  //get the current path
  const pathname = usePathname();
  //get the function of replacing the current route
  const { replace } = useRouter();

  //use the debounceCallback to fire this function only after 300ms wihout user clicking
  const handleSearch = useDebouncedCallback((term: string) => {
    //manipulate the dynamic urls
    const params = new URLSearchParams(searchParams);
    //format the param into url
    if (term) {
      params.set("query", term); //`query=${term}`
    } else {
      params.delete("query");
    }
    //then concat with the current URL
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
