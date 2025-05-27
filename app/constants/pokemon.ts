export const STAT_COLORS = {
  hp: "bg-red-400",
  attack: "bg-orange-400",
  defense: "bg-blue-400",
  "special-attack": "bg-purple-400",
  "special-defense": "bg-green-400",
  speed: "bg-yellow-400",
};

export const TYPE_COLORS: Record<string, string> = {
  normal: "bg-pokemon-normal",
  fire: "bg-pokemon-fire",
  water: "bg-pokemon-water",
  electric: "bg-pokemon-electric",
  grass: "bg-pokemon-grass",
  ice: "bg-pokemon-ice",
  fighting: "bg-pokemon-fighting",
  poison: "bg-pokemon-poison",
  ground: "bg-pokemon-ground",
  flying: "bg-pokemon-flying",
  psychic: "bg-pokemon-psychic",
  bug: "bg-pokemon-bug",
  rock: "bg-pokemon-rock",
  ghost: "bg-pokemon-ghost",
  dragon: "bg-pokemon-dragon",
  dark: "bg-pokemon-dark",
  steel: "bg-pokemon-steel",
  fairy: "bg-pokemon-fairy",
};

export const TYPE_BORDER_COLORS: Record<string, string> = {
  normal: "border-pokemon-normal",
  fire: "border-pokemon-fire",
  water: "border-pokemon-water",
  electric: "border-pokemon-electric",
  grass: "border-pokemon-grass",
  ice: "border-pokemon-ice",
  fighting: "border-pokemon-fighting",
  poison: "border-pokemon-poison",
  ground: "border-pokemon-ground",
  flying: "border-pokemon-flying",
  psychic: "border-pokemon-psychic",
  bug: "border-pokemon-bug",
  rock: "border-pokemon-rock",
  ghost: "border-pokemon-ghost",
  dragon: "border-pokemon-dragon",
  dark: "border-pokemon-dark",
  steel: "border-pokemon-steel",
  fairy: "border-pokemon-fairy",
};

export const getTypeColor = (type: string) =>
  TYPE_COLORS[type] || "bg-gray-400";
export const getTypeBorderColor = (type: string) =>
  TYPE_BORDER_COLORS[type] || "border-gray-400";
