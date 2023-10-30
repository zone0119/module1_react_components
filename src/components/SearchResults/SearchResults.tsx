import React, { Component, ReactNode } from 'react';

interface Pokemon {
  name: string;
  url: string;
}

interface State {
  pokemons: Pokemon[];
  filteredPokemons: Pokemon[];
  searchQuery: string;
  isLoading: boolean;
}

class SearchResults extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      pokemons: [],
      filteredPokemons: [],
      searchQuery: '',
      isLoading: true,
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
        this.setState({ 
          pokemons: data.results, 
          filteredPokemons: data.results,
          isLoading: false, 
        });
      } else {
        console.error('Failed to fetch data');
        this.setState({ isLoading: false });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({ isLoading: false });
    }
  };

  handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    this.setState({ isLoading: true });

    const { searchQuery, pokemons } = this.state;
    const filtered = pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setTimeout(() => {
      this.setState({ filteredPokemons: filtered, isLoading: false });
      localStorage.setItem('searchTerm', searchQuery);
    }, 1000);

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
        this.handleSearch(fakeEvent as React.FormEvent);
      });
    }
  };

  render(): ReactNode {
    const { filteredPokemons, searchQuery, isLoading  } = this.state;

    return (
      <div>
        <h1>Pokemon Search</h1>
        <SearchForm
          searchQuery={searchQuery}
          handleSearch={this.handleSearch}
          handleInputChange={this.handleInputChange}
        />
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <PokemonList filteredPokemons={filteredPokemons} />
        )}
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
