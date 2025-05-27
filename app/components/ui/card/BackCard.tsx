import { PokemonMove } from "@/app/libs/pokemonApi";
import { Button } from "@/app/components/ui/button/Button";

interface BackCardProps {
  types: Array<{ type: { name: string } }>;
  moves: PokemonMove[];
  getTypeColor: (type: string) => string;
  handleCardFlip: (id: number) => void;
  id: number;
  allowInternalScroll?: boolean;
}

export const BackCard = ({
  types,
  moves,
  getTypeColor,
  handleCardFlip,
  id,
  allowInternalScroll = false,
}: BackCardProps) => {
  return (
    <div className="p-4 h-full flex flex-col">
      <h3 className="text-xl font-bold mb-4 text-center">Moves</h3>
      <div
        className={`flex-1 ${
          allowInternalScroll ? "overflow-y-auto" : "overflow-hidden"
        }`}
      >
        <div className="grid grid-cols-2 gap-2">
          {moves?.map((move: PokemonMove, index: number) => (
            <div
              key={index}
              className={`${getTypeColor(
                types[0].type.name
              )} bg-opacity-20 p-2 rounded-lg text-sm`}
            >
              <span className="font-medium capitalize">
                {move.move.name.replace("-", " ")}
              </span>
            </div>
          ))}
        </div>
      </div>
      <Button onClick={() => handleCardFlip(id)}>Back to Stats</Button>
    </div>
  );
};
