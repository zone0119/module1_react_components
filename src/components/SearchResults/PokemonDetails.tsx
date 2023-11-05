import React, { useState, useEffect } from 'react';

interface Ability {
  ability: {
    name: string;
    url: string;
  };
}

interface PokemonDetails {
  name: string;
  types: Array<{ type: { name: string; url: string } }>;
  abilities: Ability[];
}

interface Props {
  name: string;
}

const PokemonDetails: React.FC<Props> = ({ name }) => {
  const [details, setDetails] = useState<PokemonDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: PokemonDetails = await response.json();
        setDetails(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
        setIsLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [name]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!details) {
    return <div>No details available for this Pokemon.</div>;
  }

  return (
    <div>
      <h2>{details.name}</h2>
      <p>Type: {details.types.map((type) => type.type.name).join(', ')}</p>
      <p>Abilities: {details.abilities.map((ability) => ability.ability.name).join(', ')}</p>
    </div>
  );
};

export default PokemonDetails;
