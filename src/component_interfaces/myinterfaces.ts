
export interface PagesProps {
    
}


export interface SearchResultProps {
    searchResults: { name: string; description: string }[];
}


export interface Pokemon {
    name: string;
    url: string;
  }
  
export interface State {
    pokemons: Pokemon[];
    filteredPokemons: Pokemon[];
    searchQuery: string;
  }