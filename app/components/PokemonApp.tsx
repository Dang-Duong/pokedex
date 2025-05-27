"use client";

import { useState } from "react";
import { SearchBar } from "@/app/components/ui/searchBar/SearchBar";

export const PokemonApp = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
      <SearchBar query={searchQuery} onQueryChange={setSearchQuery} />
    </>
  );
};
