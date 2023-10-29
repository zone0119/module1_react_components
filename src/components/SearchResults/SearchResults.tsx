import React, { Component, ReactNode } from 'react';

interface Pokemon {
  name: string;
  url: string;
}

interface State {
  pokemons: Pokemon[];
  filteredPokemons: Pokemon[];
  searchQuery: string;
}

class SearchResults extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      pokemons: [],
      filteredPokemons: [],
      searchQuery: '',
    };
  }

  componentDidMount() {
    this.fetchData();
    this.loadSearchTerm();
  }

  fetchData = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon');
      if (response.ok) {
        const data = await response.json();
        this.setState({ pokemons: data.results, filteredPokemons: data.results });
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const { searchQuery, pokemons } = this.state;
    const filtered = pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    this.setState({ filteredPokemons: filtered });
    localStorage.setItem('searchTerm', searchQuery); 
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: event.target.value });
  };


 

  loadSearchTerm = () => {

    const fakeEvent = {
      preventDefault: () => {} 
    } as React.FormEvent<HTMLFormElement>;
    

    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      this.setState({ searchQuery: savedSearchTerm }, () => {
        this.handleSearch(fakeEvent);
      });
    }
  };

  render(): ReactNode {
    const { filteredPokemons, searchQuery } = this.state;

    return (
      <div>
        <h1>Pokemon Search</h1>
        <SearchForm
          searchQuery={searchQuery}
          handleSearch={this.handleSearch}
          handleInputChange={this.handleInputChange}
        />
        <PokemonList filteredPokemons={filteredPokemons} />
      </div>
    );
  }
}

interface SearchFormProps {
  searchQuery: string;
  handleSearch: (event: React.FormEvent) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  searchQuery,
  handleSearch,
  handleInputChange,
}) => {
  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search Pokemon"
      />
      <button type="submit">Search</button>
    </form>
  );
};

interface PokemonListProps {
  filteredPokemons: Pokemon[];
}

const PokemonList: React.FC<PokemonListProps> = ({ filteredPokemons }) => {
  return (
    <ul>
      {filteredPokemons.map(pokemon => (
        <PokemonItem key={pokemon.name} name={pokemon.name} />
      ))}
    </ul>
  );
};

interface PokemonItemProps {
  name: string;
}

const PokemonItem: React.FC<PokemonItemProps> = ({ name }) => {
  return <li>{name}</li>;
};

export default SearchResults;
