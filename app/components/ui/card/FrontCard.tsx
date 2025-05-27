import Image from "next/image";
import { Button } from "@/app/components/ui/button/Button";

interface FrontCardProps {
  id: number;
  name: string;
  types: Array<{ type: { name: string } }>;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  statsData: Record<string, number>;
  statColors: Record<string, string>;
  getTypeColor: (type: string) => string;
  handleCardFlip: (id: number) => void;
}

export const FrontCard = ({
  id,
  name,
  types,
  sprites,
  statsData,
  statColors,
  getTypeColor,
  handleCardFlip,
}: FrontCardProps) => {
  return (
    <div className="relative w-full h-full flex flex-col">
      <span className="front-only absolute top-4 right-4 bg-yellow-200 text-yellow-800 rounded-full px-3 py-1 text-xs font-bold shadow z-10 transition-transform duration-1000">
        #{id.toString().padStart(3, "0")}
      </span>

      <div
        className={`${getTypeColor(
          types[0].type.name
        )} w-full flex-1 flex justify-center items-center rounded-t-xl opacity-85`}
      >
        <Image
          src={sprites.other["official-artwork"].front_default}
          alt={name}
          width={140}
          height={140}
          className="my-4"
        />
      </div>

      <div className="flex flex-col flex-1 justify-between p-4">
        <div>
          <h2 className="text-xl font-pokemon-solid text-black mb-3 capitalize text-center">
            {name}
          </h2>
          <div className="flex gap-2 mb-3 justify-center flex-wrap">
            {types.map((t) => (
              <span
                key={t.type.name}
                className={`${getTypeColor(
                  t.type.name
                )} text-white rounded-full px-3 py-1 text-xs font-semibold`}
              >
                {t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)}
              </span>
            ))}
          </div>
          <div className="w-full mb-3">
            {Object.entries(statsData).map(([stat, value]) => (
              <div key={stat} className="mb-2">
                <div className="flex justify-between text-xs text-gray-600">
                  <span className="capitalize">{stat.replace("-", " ")}</span>
                  <span>{value}</span>
                </div>
                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden my-0.5">
                  <div
                    className={`h-full ${
                      statColors[stat as keyof typeof statColors]
                    }`}
                    style={{ width: `${(value / 100) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Button onClick={() => handleCardFlip(id)}>View Moves</Button>
      </div>
    </div>
  );
};
