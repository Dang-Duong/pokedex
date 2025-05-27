export const POKEMON_TYPES = [
  {
    name: "normal",
    icon: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/normal.svg",
    color: "bg-gray-400",
  },
  {
    name: "fire",
    icon: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/fire.svg",
    color: "bg-red-500",
  },
  {
    name: "water",
    icon: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/water.svg",
    color: "bg-blue-500",
  },
  {
    name: "electric",
    icon: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/electric.svg",
    color: "bg-yellow-500",
  },
  {
    name: "grass",
    icon: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/grass.svg",
    color: "bg-green-500",
  },
  {
    name: "ice",
    icon: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/ice.svg",
    color: "bg-cyan-400",
  },
  {
    name: "fighting",
    icon: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/fighting.svg",
    color: "bg-orange-600",
  },
  {
    name: "poison",
    icon: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/poison.svg",
    color: "bg-purple-500",
  },
  {
    name: "ground",
    icon: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/ground.svg",
    color: "bg-amber-600",
  },
  {
    name: "flying",
    icon: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/flying.svg",
    color: "bg-indigo-400",
  },
  {
    name: "psychic",
    icon: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/psychic.svg",
    color: "bg-pink-500",
  },
  {
    name: "bug",
    icon: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/bug.svg",
    color: "bg-lime-500",
  },
  {
    name: "rock",
    icon: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/rock.svg",
    color: "bg-stone-500",
  },
  {
    name: "ghost",
    icon: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/ghost.svg",
    color: "bg-slate-600",
  },
  {
    name: "dragon",
    icon: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/dragon.svg",
    color: "bg-violet-600",
  },
  {
    name: "dark",
    icon: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/dark.svg",
    color: "bg-gray-800",
  },
  {
    name: "steel",
    icon: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/steel.svg",
    color: "bg-gray-500",
  },
  {
    name: "fairy",
    icon: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/fairy.svg",
    color: "bg-rose-400",
  },
];

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
