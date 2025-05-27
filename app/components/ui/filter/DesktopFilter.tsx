import Image from "next/image";
import { Button } from "../button/Button";
import { POKEMON_TYPES } from "@/app/constants/pokemon";

interface FilterProps {
  selectedTypes: string[];
  searchQuery: string;
  handleTypeClick: (typeName: string) => void;
  clearFilters: () => void;
}

export const DesktopFilter = ({
  selectedTypes,
  searchQuery,

  handleTypeClick,
  clearFilters,
}: FilterProps) => (
  <div className="hidden lg:block">
    <div className="text-center mb-8">
      <h2 className="text-3xl font-pokemon-solid text-gray-800 mb-2">
        Filter by Type
      </h2>
      <p className="text-gray-600 font-pokemon-solid">
        {selectedTypes.length > 0
          ? `Active filters: ${selectedTypes.join(", ")}`
          : searchQuery
          ? `Search results for "${searchQuery}"`
          : "Select types to filter Pokémon"}
      </p>
    </div>

    <div className="grid grid-cols-6 lg:grid-cols-9 gap-6 mb-8">
      {POKEMON_TYPES.map(({ name, icon, color }) => (
        <Button
          key={name}
          variant="type"
          selected={selectedTypes.includes(name)}
          color={color}
          onClick={() => handleTypeClick(name)}
        >
          <Image
            src={icon}
            alt={name}
            width={64}
            height={64}
            className="w-12 h-12 object-contain p-2"
          />
        </Button>
      ))}
    </div>

    {selectedTypes.length > 0 && (
      <div className="text-center flex justify-center">
        <Button onClick={clearFilters} variant="red" className="!w-auto">
          Clear Type Filters
        </Button>
      </div>
    )}
  </div>
);
