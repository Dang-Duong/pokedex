import { Button } from "../button/Button";

interface MobileFilterProps {
  selectedTypes: string[];
  searchQuery: string;
  setIsModalOpen: (open: boolean) => void;
  clearFilters: () => void;
}

export const MobileFilter = ({
  selectedTypes,
  searchQuery,
  setIsModalOpen,
  clearFilters,
}: MobileFilterProps) => (
  <div className="lg:hidden w-full">
    <div className="text-center mb-6">
      <p className="text-gray-600 font-pokemon-solid text-sm">
        {selectedTypes.length > 0
          ? `Active filters: ${selectedTypes.join(", ")}`
          : searchQuery
          ? `Search results for "${searchQuery}"`
          : "Tap to filter by type"}
      </p>
    </div>

    <div className="flex justify-center gap-4">
      <Button onClick={() => setIsModalOpen(true)} className="!w-auto px-6">
        Filter by Type
        {selectedTypes.length > 0 && (
          <span className="bg-red-500 text-white rounded-full px-2 text-xs ml-2 py-1">
            {selectedTypes.length}
          </span>
        )}
      </Button>

      {selectedTypes.length > 0 && (
        <Button onClick={clearFilters} variant="red" className="!w-auto px-4">
          Clear
        </Button>
      )}
    </div>
  </div>
);
