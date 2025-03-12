export interface PokemonResponse {
  id: number;
  name: string;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  abilities: {
    ability: {
      name: string;
    };
  }[];
}

export interface PokemonListResponse {
  count: number;
  results: {
    name: string;
    url: string;
  }[];
}

export interface Pokemon {
  id: number;
  name: string;
  abilities: {
    ability: {
      name: string;
    };
  }[];
  imageUrl: string;
}
