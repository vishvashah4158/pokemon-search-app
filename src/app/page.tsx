import PokemonList from './components/PokemonList';

export default function Home() {
  return (
    <main className="min-h-screen py-8">
      <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">Pokémon Search</h1>
        <PokemonList />
    </main>
  );
}
