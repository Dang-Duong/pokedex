import { pokemonApi, Pokemon } from "@/app/libs/pokemonApi";

export const searchByText = async (
  searchQuery: string,
  limit: number = 50
): Promise<Pokemon[]> => {
  const isNumeric = /^\d+$/.test(searchQuery.trim());

  if (isNumeric) {
    try {
      const pokemon = await pokemonApi.getPokemon(parseInt(searchQuery));
      return [pokemon];
    } catch {
      return [];
    }
  }

  const names = await pokemonApi.getAllPokemonNames();
  const filteredNames = names.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return await Promise.all(
    filteredNames.slice(0, limit).map(({ name }) => pokemonApi.getPokemon(name))
  );
};

export const searchByTypes = async (
  typeList: string[],
  limit: number = 20,
  offset: number = 0
): Promise<{ pokemons: Pokemon[]; hasMore: boolean }> => {
  if (typeList.length === 1) {
    const typeData = await pokemonApi.getPokemonByType(
      typeList[0],
      limit,
      offset
    );
    const pokemonDetails = await Promise.all(
      typeData.names.map((name: string) => pokemonApi.getPokemon(name))
    );
    return {
      pokemons: pokemonDetails,
      hasMore: typeData.hasMore,
    };
  } else {
    const typePromises = typeList.map((type) =>
      pokemonApi.getAllPokemonNamesForType(type)
    );

    const typeResults = await Promise.all(typePromises);
    let commonPokemon: string[] = typeResults[0] || [];

    for (let i = 1; i < typeResults.length; i++) {
      commonPokemon = commonPokemon.filter((name) =>
        typeResults[i].includes(name)
      );
    }

    const paginatedNames = commonPokemon.slice(offset, offset + limit);
    const pokemonDetails = await Promise.all(
      paginatedNames.map((name: string) => pokemonApi.getPokemon(name))
    );

    return {
      pokemons: pokemonDetails,
      hasMore: offset + limit < commonPokemon.length,
    };
  }
};

export const fetchFilteredPokemons = async (
  searchQuery: string,
  typeFilters: string[]
): Promise<Pokemon[]> => {
  if (searchQuery && !typeFilters.length) {
    return await searchByText(searchQuery);
  } else if (!searchQuery && typeFilters.length) {
    const result = await searchByTypes(typeFilters, 20, 0);
    return result.pokemons;
  } else if (searchQuery && typeFilters.length) {
    const textResults = await searchByText(searchQuery, 100);
    return textResults.filter((pokemon) => {
      const pokemonTypes = pokemon.types.map((t) => t.type.name);
      return typeFilters.every((type) => pokemonTypes.includes(type));
    });
  }
  return [];
};

export const loadMoreTypeFiltered = async (
  typeFilters: string[],
  currentOffset: number
): Promise<{ pokemons: Pokemon[]; hasMore: boolean }> => {
  return await searchByTypes(typeFilters, 20, currentOffset);
};
