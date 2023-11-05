import React from 'react';
import PokemonItem from './PokemonItem';

interface Pokemon {
  name: string;
}

interface PokemonListProps {
  filteredPokemons: Pokemon[];
}

const PokemonList: React.FC<PokemonListProps> = ({ filteredPokemons }) => {
  return (
    <ol>
      {filteredPokemons.map(pokemon => (
        <PokemonItem key={pokemon.name} name={pokemon.name} />
      ))}
    </ol>
  );
};

export default PokemonList;