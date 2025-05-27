import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2";

export interface PokemonSprites {
  other: {
    "official-artwork": {
      front_default: string;
      front_shiny: string;
    };
  };
}

export interface Pokemon {
  id: number;
  name: string;
  sprites: PokemonSprites;
  types: Array<{
    type: {
      name: string;
    };
  }>;
  height: number;
  weight: number;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
  stats: PokemonStat[];
  moves: PokemonMove[];
}

export interface PokemonMove {
  move: {
    name: string;
    url: string;
  };
  version_group_details: Array<{
    level_learned_at: number;
    move_learn_method: {
      name: string;
      url: string;
    };
    version_group: {
      name: string;
      url: string;
    };
  }>;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}

export const pokemonApi = {
  // Get total count of Pokemon
  getTotalPokemonCount: async () => {
    try {
      const response = await axios.get<PokemonListResponse>(
        `${BASE_URL}/pokemon?limit=1`
      );
      return response.data.count;
    } catch (error) {
      console.error("Error fetching Pokemon count:", error);
      throw error;
    }
  },

  getAllPokemonNames: async () => {
    try {
      const response = await axios.get<PokemonListResponse>(
        `${BASE_URL}/pokemon?limit=2000`
      );
      return response.data.results;
    } catch (error) {
      console.error("Error fetching all Pokemon names:", error);
      throw error;
    }
  },

  // Get all Pokemon names for a type (base function)
  getAllPokemonNamesForType: async (typeName: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/type/${typeName}`);
      return response.data.pokemon.map(
        (p: { pokemon: { name: string } }) => p.pokemon.name
      );
    } catch (error) {
      console.error(
        `Error fetching all Pokemon names for type ${typeName}:`,
        error
      );
      throw error;
    }
  },

  // Get Pokemon by type with pagination
  getPokemonByType: async (
    typeName: string,
    limit: number = 15,
    offset: number = 0
  ) => {
    try {
      const allPokemonOfType = await pokemonApi.getAllPokemonNamesForType(
        typeName
      );

      const paginatedNames = allPokemonOfType.slice(offset, offset + limit);
      const hasMore = offset + limit < allPokemonOfType.length;

      return {
        names: paginatedNames,
        total: allPokemonOfType.length,
        hasMore,
      };
    } catch (error) {
      console.error(`Error fetching Pokemon by type ${typeName}:`, error);
      throw error;
    }
  },

  // Get a list of Pokemon with pagination
  getPokemonList: async (limit: number = 20, offset: number = 0) => {
    try {
      const response = await axios.get<PokemonListResponse>(
        `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Pokemon list:", error);
      throw error;
    }
  },

  // Get a single Pokemon by name or ID
  getPokemon: async (nameOrId: string | number) => {
    try {
      const response = await axios.get<Pokemon>(
        `${BASE_URL}/pokemon/${nameOrId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching Pokemon ${nameOrId}:`, error);
      throw error;
    }
  },

  // Search Pokemon by name
  searchPokemon: async (query: string) => {
    try {
      const response = await axios.get<PokemonListResponse>(
        `${BASE_URL}/pokemon?limit=2000`
      );
      const filteredResults = response.data.results.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(query.toLowerCase())
      );
      return {
        ...response.data,
        results: filteredResults,
      };
    } catch (error) {
      console.error("Error searching Pokemon:", error);
      throw error;
    }
  },

  // Get Pokemon moves
  getPokemonMoves: async (nameOrId: string | number) => {
    try {
      const response = await axios.get<{ moves: PokemonMove[] }>(
        `${BASE_URL}/pokemon/${nameOrId}`
      );
      return response.data.moves;
    } catch (error) {
      console.error(`Error fetching moves for Pokemon ${nameOrId}:`, error);
      throw error;
    }
  },

  // Get Pokemon stats
  getPokemonStats: async (nameOrId: string | number) => {
    try {
      const response = await axios.get<{ stats: PokemonStat[] }>(
        `${BASE_URL}/pokemon/${nameOrId}`
      );
      return response.data.stats;
    } catch (error) {
      console.error(`Error fetching stats for Pokemon ${nameOrId}:`, error);
      throw error;
    }
  },

  // Get official artwork
  getOfficialArtwork: async (nameOrId: string | number) => {
    try {
      const response = await axios.get<{ sprites: PokemonSprites }>(
        `${BASE_URL}/pokemon/${nameOrId}`
      );
      return response.data.sprites.other["official-artwork"];
    } catch (error) {
      console.error(
        `Error fetching official artwork for Pokemon ${nameOrId}:`,
        error
      );
      throw error;
    }
  },
};
