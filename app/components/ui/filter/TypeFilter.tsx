"use client";

import { useState } from "react";
import { DesktopFilter } from "./DesktopFilter";
import { MobileFilter } from "./MobileFilter";
import { TypeFilterModal } from "./TypeFilterModal";

interface TypeFilterProps {
  selectedTypes: string[];
  onTypesChange: (types: string[]) => void;
  searchQuery: string;
}

export const TypeFilter = ({
  selectedTypes,
  onTypesChange,
  searchQuery,
}: TypeFilterProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTypeClick = (typeName: string) => {
    const newSelected = selectedTypes.includes(typeName)
      ? selectedTypes.filter((t) => t !== typeName)
      : [...selectedTypes, typeName];

    onTypesChange(newSelected);
  };

  const clearFilters = () => {
    onTypesChange([]);
    setIsModalOpen(false);
  };

  return (
    <div
      data-animate
      data-animate-delay="1.5"
      className="w-full flex flex-col items-center p-6 opacity-0"
    >
      <DesktopFilter
        selectedTypes={selectedTypes}
        searchQuery={searchQuery}
        handleTypeClick={handleTypeClick}
        clearFilters={clearFilters}
      />
      <MobileFilter
        selectedTypes={selectedTypes}
        searchQuery={searchQuery}
        setIsModalOpen={setIsModalOpen}
        clearFilters={clearFilters}
      />
      <TypeFilterModal
        isModalOpen={isModalOpen}
        selectedTypes={selectedTypes}
        setIsModalOpen={setIsModalOpen}
        handleTypeClick={handleTypeClick}
        clearFilters={clearFilters}
      />
    </div>
  );
};
