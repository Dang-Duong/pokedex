"use client";

import { useEffect, useState } from "react";
import { pokemonApi, Pokemon, PokemonStat } from "@/app/libs/pokemonApi";
import { gsap } from "@/app/libs/gsap";
import { useGSAP } from "@gsap/react";
import { FrontCard } from "@/app/components/ui/card/FrontCard";
import { BackCard } from "@/app/components/ui/card/BackCard";
import { LoadMore } from "@/app/components/ui/button/LoadMore";
import {
  fetchFilteredPokemons,
  loadMoreTypeFiltered,
} from "@/app/components/ui/searchBar/searchUtils";
import {
  STAT_COLORS,
  getTypeColor,
  getTypeBorderColor,
} from "@/app/constants/pokemon";

interface PokemonCardProps {
  query: string;
  types: string[];
}

export const PokemonCard = ({ query, types }: PokemonCardProps) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [hasMore, setHasMore] = useState(true);

  const hasSearchOrFilter = query.trim() || types.length > 0;
  const isTypeFilterOnly = !query.trim() && types.length > 0;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setOffset(0);

      try {
        let results: Pokemon[] = [];

        if (hasSearchOrFilter) {
          results = await fetchFilteredPokemons(query, types);
          setHasMore(isTypeFilterOnly);
          setOffset(isTypeFilterOnly ? 20 : 0);
        } else {
          const list = await pokemonApi.getPokemonList(20, 0);
          results = await Promise.all(
            list.results.map(({ name }) => pokemonApi.getPokemon(name))
          );
          setHasMore(true);
          setOffset(20);
        }

        setPokemons(results);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
        setPokemons([]);
        setHasMore(false);
      }
      setLoading(false);
    };

    fetchData();
  }, [query, types, hasSearchOrFilter, isTypeFilterOnly]);

  const loadMorePokemons = async () => {
    if (!hasMore || loadingMore) return;

    setLoadingMore(true);
    try {
      if (isTypeFilterOnly) {
        const result = await loadMoreTypeFiltered(types, offset);
        setPokemons((prev) => [...prev, ...result.pokemons]);
        setOffset((prev) => prev + 20);
        setHasMore(result.hasMore);
      } else {
        const list = await pokemonApi.getPokemonList(20, offset);
        const details = await Promise.all(
          list.results.map(({ name }) => pokemonApi.getPokemon(name))
        );
        setPokemons((prev) => [...prev, ...details]);
        setOffset((prev) => prev + 20);

        const totalCount = await pokemonApi.getTotalPokemonCount();
        setHasMore(offset + 20 < totalCount);
      }
    } catch (error) {
      console.error("Failed to load more Pokémon:", error);
    }
    setLoadingMore(false);
  };

  useGSAP(
    () => {
      if (!loading && pokemons.length > 0) {
        const container = document.querySelector(
          "[data-animate-stagger-container='true']"
        );
        if (container) {
          const elements = gsap.utils.toArray("[data-animate]", container);

          const isInitialLoad = !hasSearchOrFilter && offset === 20;
          const delay = isInitialLoad ? 1.5 : 0.2;

          gsap.to(elements, {
            opacity: 1,
            duration: 0.4,
            stagger: 0.1,
            delay: delay,
            ease: "power1.out",
          });
        }
      }
    },
    { dependencies: [loading, pokemons, hasSearchOrFilter, offset] }
  );

  const handleCardFlip = (id: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center my-20">
        <div className="text-lg text-gray-600 font-pokemon-solid">
          Loading Pokémon...
        </div>
      </div>
    );
  }

  if (hasSearchOrFilter && pokemons.length === 0) {
    const filterText =
      types.length > 0
        ? `type${types.length > 1 ? "s" : ""}: ${types.join(", ")}`
        : "";
    const searchText = query ? `"${query}"` : "";
    const combinedText = [searchText, filterText].filter(Boolean).join(" and ");

    return (
      <div className="flex flex-col justify-center items-center my-20 font-pokemon-solid">
        <div className="text-lg text-gray-600 mb-2">
          No Pokémon found for {combinedText}
        </div>
        <div className="text-sm text-center text-gray-500">
          Try different search terms or type filters
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        data-animate-stagger-container="true"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 p-10"
      >
        {pokemons.map(({ id, name, types, sprites, stats, moves }) => {
          const statsData = {
            hp:
              stats?.find((s: PokemonStat) => s.stat.name === "hp")
                ?.base_stat ?? 0,
            attack:
              stats?.find((s: PokemonStat) => s.stat.name === "attack")
                ?.base_stat ?? 0,
            defense:
              stats?.find((s: PokemonStat) => s.stat.name === "defense")
                ?.base_stat ?? 0,
            "special-attack":
              stats?.find((s: PokemonStat) => s.stat.name === "special-attack")
                ?.base_stat ?? 0,
            "special-defense":
              stats?.find((s: PokemonStat) => s.stat.name === "special-defense")
                ?.base_stat ?? 0,
            speed:
              stats?.find((s: PokemonStat) => s.stat.name === "speed")
                ?.base_stat ?? 0,
          };

          const isFlipped = flippedCards[id] || false;

          return (
            <div
              key={id}
              data-animate
              className="opacity-0 [perspective:1000px] min-h-[600px]"
            >
              <div
                className={`relative w-full h-full transition-transform duration-1000 [transform-style:preserve-3d] ${
                  isFlipped
                    ? "[transform:rotateY(180deg)] [&_.front-only]:[transform:scaleX(-1)]"
                    : ""
                }`}
              >
                {/* Front of card */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden]">
                  <div
                    className={`bg-white rounded-3xl shadow-lg h-full border-[12px] ${getTypeBorderColor(
                      types[0].type.name
                    )} border-opacity-80 flex flex-col`}
                  >
                    <FrontCard
                      id={id}
                      name={name}
                      types={types}
                      sprites={sprites}
                      statsData={statsData}
                      statColors={STAT_COLORS}
                      getTypeColor={getTypeColor}
                      handleCardFlip={handleCardFlip}
                    />
                  </div>
                </div>

                {/* Back of card */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <div
                    className={`bg-white rounded-3xl shadow-lg h-full border-[12px] ${getTypeBorderColor(
                      types[0].type.name
                    )} border-opacity-80`}
                  >
                    <BackCard
                      types={types}
                      moves={moves}
                      getTypeColor={getTypeColor}
                      handleCardFlip={handleCardFlip}
                      id={id}
                      allowInternalScroll={isFlipped}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {hasMore && pokemons.length > 0 && (
        <LoadMore onLoadMore={loadMorePokemons} loading={loadingMore} />
      )}
    </>
  );
};
