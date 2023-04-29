import { useState, useEffect } from "react";

export const useFilterDebounce = (delay = 350) => {
  const [search, setSearch] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);

  useEffect(() => {
    // console.log(searchQuery);
    const delayFn = setTimeout(() => setSearch(searchQuery), delay);
    return () => clearTimeout(delayFn);
  }, [searchQuery, delay]);

  return [search, setSearchQuery];
};
