"use client";

import { Suspense, useState } from "react";
import { SearchBar } from "@/app/components/ui/searchBar/SearchBar";
import { PokemonCard } from "./PokemonCard";
import { TypeFilter } from "./ui/filter/TypeFilter";

export const PokemonApp = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  return (
    <>
      <SearchBar query={searchQuery} onQueryChange={setSearchQuery} />
      <TypeFilter
        selectedTypes={selectedTypes}
        onTypesChange={setSelectedTypes}
        searchQuery={searchQuery}
      />
      <Suspense
        fallback={
          <div className="flex justify-center items-center my-20">
            <div className="text-lg text-gray-600 font-pokemon-solid">
              Loading Pokémon...
            </div>
          </div>
        }
      >
        <PokemonCard query={searchQuery} types={selectedTypes} />
      </Suspense>
    </>
  );
};
