export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonType {
  type: {
    name: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
  };
}

export interface PokemonSprites {
  other: {
    "official-artwork": {
      front_default: string;
    };
  };
}

export interface Pokemon {
  name: string;
  height: number;
  weight: number;
  stats: PokemonStat[];
  types: PokemonType[];
  abilities: PokemonAbility[];
  sprites: PokemonSprites;
}