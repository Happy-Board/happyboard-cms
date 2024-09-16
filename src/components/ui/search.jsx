"use client";

import styles from "@/styles/search.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { MdSearch } from "react-icons/md";
import { useDebouncedCallback } from "use-debounce";

const Search = ({ placeholder }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((e) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", 1);

    if (e.target.value) {
      e.target.value.length > 2 && params.set("keyword", e.target.value);
    } else {
      params.delete("keyword");
    }
    replace(`${pathname}?${params}`);
  }, 300);
  return (
    <Suspense>
      <div className={styles.container}>
        <MdSearch />
        <input
          className={styles.input}
          type="text"
          placeholder={placeholder}
          onChange={handleSearch}
        />
      </div>
    </Suspense>
  );
};

export default Search;
