'use client';

import { useState, useEffect } from 'react';

interface Pokemon {
  name: string;
  url: string;
}

export function usePokemonSearch() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch all Pokemon types
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/type')
      .then((res) => res.json())
      .then((data) => {
        setPokemonTypes(data.results.map((type: Pokemon) => type.name));
      });
  }, []);

  // Fetch all Pokemon
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then((res) => res.json())
      .then((data) => {
        setPokemonList(data.results);
        setFilteredPokemon(data.results);
        setLoading(false);
      });
  }, []);

  // Filter Pokemon by type
  useEffect(() => {
    const filterPokemon = async () => {
      if (!selectedType) {
        setFilteredPokemon(
          pokemonList.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
        return;
      }

      const response = await fetch(
        `https://pokeapi.co/api/v2/type/${selectedType}`
      );
      const data = await response.json();
      const pokemonOfType = data.pokemon.map((p: any) => p.pokemon);
      
      setFilteredPokemon(
        pokemonOfType.filter((pokemon: Pokemon) =>
          pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    };

    filterPokemon();
  }, [selectedType, searchTerm, pokemonList]);

  return {
    pokemonList: filteredPokemon,
    pokemonTypes,
    searchTerm,
    selectedType,
    setSearchTerm,
    setSelectedType,
    loading,
  };
}