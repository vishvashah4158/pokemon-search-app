import Breadcrumb from "@/app/components/Breadcrumb";
import { Pokemon } from "@/app/types/pokemon";
import { Metadata } from "next";
import { JSX } from "react";

async function getPokemonDetails(name: string) {
  const res = await fetch(`${process.env.BASE_URL}/api/pokemon/${name}`);
  if (!res.ok) throw new Error("Failed to fetch pokemon");
  const data = await res.json();
  return data as Pokemon;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const pokemon = await getPokemonDetails(name);
  return {
    title: `Pokemon - ${pokemon.name}`,
    description: `View details for ${pokemon.name}`,
  };
}

export default async function PokemonDetail({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<JSX.Element> {
  const { name } = await params;
  const pokemon: Pokemon = await getPokemonDetails(name);

  return (
    <div className="container mx-auto px-4">
      <Breadcrumb />
      <div className="max-w-2xl mx-auto mt-8 p-8 bg-white rounded-xl shadow-xl text-black">
        <div className="text-center">
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            className="w-64 h-64 mx-auto drop-shadow-xl transform transition-all duration-500 hover:scale-110"
          />
          <h1 className="text-4xl font-bold capitalize mt-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
            {pokemon.name}
          </h1>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Stats</h2>
            {pokemon.stats.map((stat) => (
              <div key={stat.stat.name} className="mb-2">
                <div className="flex justify-between">
                  <span className="capitalize">{stat.stat.name}:</span>
                  <span>{stat.base_stat}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`stat-bar-fill ${stat.stat.name}-bar`}
                    style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Details</h2>
            <p className="text-gray-600 mb-2">
              Height:{" "}
              <span className="font-semibold text-gray-800">
                {pokemon.height / 10}m
              </span>
            </p>
            <p className="text-gray-600 mb-2">
              Weight:{" "}
              <span className="font-semibold text-gray-800">
                {pokemon.weight / 10}kg
              </span>
            </p>
            <div className="mt-4">
              <h3 className="font-semibold">Types:</h3>
              <div className="flex gap-2 mt-1">
                {pokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium text-white bg-${
                      type.type.name === "normal"
                        ? "gray-400"
                        : type.type.name === "fire"
                        ? "red-500"
                        : type.type.name === "water"
                        ? "blue-500"
                        : type.type.name === "grass"
                        ? "green-500"
                        : type.type.name === "electric"
                        ? "yellow-400"
                        : type.type.name === "ice"
                        ? "blue-300"
                        : type.type.name === "fighting"
                        ? "red-600"
                        : type.type.name === "poison"
                        ? "purple-500"
                        : type.type.name === "ground"
                        ? "yellow-600"
                        : type.type.name === "flying"
                        ? "indigo-400"
                        : type.type.name === "psychic"
                        ? "pink-500"
                        : type.type.name === "bug"
                        ? "green-400"
                        : type.type.name === "rock"
                        ? "yellow-800"
                        : type.type.name === "ghost"
                        ? "purple-600"
                        : type.type.name === "dragon"
                        ? "indigo-600"
                        : type.type.name === "dark"
                        ? "gray-800"
                        : type.type.name === "steel"
                        ? "gray-500"
                        : type.type.name === "fairy"
                        ? "pink-400"
                        : "gray-400"
                    }`}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold">Abilities:</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {pokemon.abilities.map((ability) => (
                  <span
                    key={ability.ability.name}
                    className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium capitalize hover:bg-gray-200 transition-colors duration-200"
                  >
                    {ability.ability.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
