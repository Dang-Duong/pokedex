"use client";

import { useState, useCallback } from "react";
import { Button } from "../button/Button";
import { CrossIcon } from "@/app/components/ui/icons/CrossIcon";

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
}

export const SearchBar = ({ query, onQueryChange }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState(query);

  const debouncedSearch = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (searchQuery: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          onQueryChange(searchQuery);
        }, 500);
      };
    })(),
    [onQueryChange]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSearch(value);
  };

  const handleClear = () => {
    setInputValue("");
    onQueryChange("");
  };

  return (
    <div
      data-animate
      data-animate-delay="1.5"
      className="flex justify-center mt-8 opacity-0"
    >
      <div className="relative w-10/12 lg:w-full max-w-md">
        <input
          type="text"
          value={inputValue}
          onChange={handleSearch}
          placeholder="Search Pokémon by name or ID..."
          className="w-full px-6 py-3 rounded-full border-2 border-gray-200 focus:border-red-500 focus:outline-none transition-colors duration-200 bg-white shadow-sm pr-12"
        />
        {inputValue && (
          <Button
            onClick={handleClear}
            variant="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            <CrossIcon />
          </Button>
        )}
      </div>
    </div>
  );
};
