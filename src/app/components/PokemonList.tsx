"use client";

import React from "react";
import { usePokemonSearch } from "../hooks/usePokemonSearch";
import Link from "next/link";

export default function PokemonList() {
  const {
    pokemonList,
    pokemonTypes,
    searchTerm,
    selectedType,
    setSearchTerm,
    setSelectedType,
    loading,
  } = usePokemonSearch();

  return (
    <div className="container mx-auto px-4">
      <form className="mb-8 space-y-4 md:space-y-0 md:flex md:gap-4">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="select-input"
        >
          <option value="">All Types</option>
          {pokemonTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Pokémon..."
          className="search-input"
        />
      </form>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {pokemonList.map((pokemon) => (
            <Link
              href={`/pokemon/${pokemon.name}`}
              key={pokemon.name}
              className="block"
            >
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transform transition-all duration-300 hover:scale-105">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    pokemon.url.split("/")[6]
                  }.png`}
                  alt={pokemon.name}
                  className="w-40 h-40 mx-auto transition-transform duration-300 group-hover:scale-110"
                />
                <h2 className="text-center mt-4 text-xl capitalize font-semibold text-gray-800">
                  {pokemon.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
