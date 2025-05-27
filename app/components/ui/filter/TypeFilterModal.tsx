"use client";

import { createPortal } from "react-dom";
import Image from "next/image";
import { Button } from "../button/Button";
import { useAnimations } from "@/app/animations/useAnimations";
import { POKEMON_TYPES } from "@/app/constants/pokemon";

interface TypeFilterModalProps {
  isModalOpen: boolean;
  selectedTypes: string[];
  setIsModalOpen: (open: boolean) => void;
  handleTypeClick: (typeName: string) => void;
  clearFilters: () => void;
}

export const TypeFilterModal = ({
  isModalOpen,
  selectedTypes,
  setIsModalOpen,
  handleTypeClick,
  clearFilters,
}: TypeFilterModalProps) => {
  const { animateModalClose } = useAnimations(isModalOpen);

  const closeModal = () => {
    animateModalClose(() => setIsModalOpen(false));
  };

  const handleClearFilters = () => {
    animateModalClose(clearFilters);
  };

  if (!isModalOpen) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        data-animate="modal-backdrop"
        className="absolute inset-0 bg-black/50"
        onClick={closeModal}
      />

      {/* Modal content */}
      <div
        data-animate="modal-content"
        className="relative bg-[#f9da49] rounded-3xl p-8 max-h-[80vh] overflow-y-auto"
      >
        <div className="text-center mb-6">
          <h3 className="text-xl font-pokemon-solid text-gray-800 mb-2">
            Filter by Type
          </h3>
          <p className="text-gray-600 text-sm">
            Select types to filter Pokémon
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-6 ">
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
                className="w-8 h-8 object-contain"
              />
            </Button>
          ))}
        </div>

        <div className="flex gap-3">
          <Button onClick={closeModal}>Done</Button>
          {selectedTypes.length > 0 && (
            <Button onClick={handleClearFilters} variant="red">
              Clear All
            </Button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
