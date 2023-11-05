import React, { useState, useEffect, FormEvent  } from 'react';
import SearchForm from './SearchForm';
import PokemonList from './PokemonList';

interface Pokemon {
  name: string;
  url: string;
}

interface SearchResultsProps {
  setSearchResultProps: (result: unknown) => void;
  handleSearch: (event: FormEvent<Element>) => void; 
}


const SearchResults: React.FC<SearchResultsProps> = ({ setSearchResultProps }) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [count, setCount] = useState<number>(0);

  const fetchData = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon');
      if (response.ok) {
        const data = await response.json();
        setPokemons(data.results);
        setFilteredPokemons(data.results);
        setIsLoading(true);
      } else {
        console.error('Failed to fetch data');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };


  const handleSearch = (event: FormEvent<Element>) => {

    event.preventDefault();
    setIsLoading(true);
  
    const filtered = pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    setTimeout(() => {
      setFilteredPokemons(filtered);
      setIsLoading(false);
      localStorage.setItem('searchTerm', searchQuery);
    }, 5000);
  };
  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchQuery = event.target.value;
    setSearchQuery(newSearchQuery);
    localStorage.setItem('searchTerm', newSearchQuery);
  };
  

  const loadSearchTerm = () => {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm && savedSearchTerm !== searchQuery) {
      setSearchQuery(savedSearchTerm);
    }
  };
  
  useEffect(() => {
    fetchData();
    loadSearchTerm();
  }, []);
  
  
  

  useEffect(() => {
    fetchData();
    loadSearchTerm();
  }, []);  

  console.log(typeof JSON.stringify(filteredPokemons[0]));

  return (
    <div>
      <button onClick={() => setSearchResultProps(JSON.stringify(filteredPokemons[0]))}>+</button>

      <h1>Pokemon Search</h1>
      <SearchForm
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        handleInputChange={handleInputChange}
      />
      {isLoading ? <div>Loading...</div> : <PokemonList filteredPokemons={filteredPokemons} />}
    </div>
  );
};

export default SearchResults;
