import React from 'react';

interface PokemonItemProps {
  name: string;
}

const PokemonItem: React.FC<PokemonItemProps> = ({ name }) => {
  return <li>{name}</li>;
};

export default PokemonItem;