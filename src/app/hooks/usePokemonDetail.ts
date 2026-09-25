import { useEffect, useState } from "react";
import { PokemonDetail } from "../types/pokemon";

export const usePokemonDetail = (name: string) => {
  const [pokemon, setPokemon] =
    useState<PokemonDetail | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      if (!name) return;

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );

        if (!response.ok) {
          throw new Error("Pokémon no encontrado");
        }

        const data: PokemonDetail =
          await response.json();

        setPokemon(data);
      } catch (err) {
        setError("No se pudo cargar el Pokémon");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [name]);

  return {
    pokemon,
    loading,
    error,
  };
};