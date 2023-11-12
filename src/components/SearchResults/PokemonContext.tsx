import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PokemonContextProps {
  children: ReactNode;
}

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonContextValue {
  pokemons: Pokemon[];
  setPokemons: React.Dispatch<React.SetStateAction<Pokemon[]>>;
  filteredPokemons: Pokemon[];
  setFilteredPokemons: React.Dispatch<React.SetStateAction<Pokemon[]>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  paginationLinks: JSX.Element[];
  setPaginationLinks: React.Dispatch<React.SetStateAction<JSX.Element[]>>;
}

const PokemonContext = createContext<PokemonContextValue | undefined>(undefined);

export const PokemonProvider: React.FC<PokemonContextProps> = ({ children }) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [paginationLinks, setPaginationLinks] = useState<JSX.Element[]>([]);

  const contextValue: PokemonContextValue = {
    pokemons,
    setPokemons,
    filteredPokemons,
    setFilteredPokemons,
    searchQuery,
    setSearchQuery,
    isLoading,
    setIsLoading,
    paginationLinks,
    setPaginationLinks,
  };

  return <PokemonContext.Provider value={contextValue}>{children}</PokemonContext.Provider>;
};

export const usePokemonContext = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('use Pokemon Context must be used within a Pokemon Provider only okAY?');
  }
  return context;
};
