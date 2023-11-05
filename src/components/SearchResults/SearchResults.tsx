import React, { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useParams, Link, Outlet } from 'react-router-dom';
import PokemonDetails from './PokemonDetails'; 
import paginationStyle from './Pagination.module.css';
import SearchResultsStyle from './SearchResults.module.css';

interface Pokemon {
  name: string;
  url: string;
}

const SearchResults: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [paginationLinks, setPaginationLinks] = useState<JSX.Element[]>([]);
  const navigate = useNavigate();
  const { page, details } = useParams();

  const resultsPerPage = 5;
  const apiURL = `https://pokeapi.co/api/v2/pokemon`;

  const loadPokemons = (pageNumber: number) => {
    setIsLoading(true);
    const offset = (pageNumber - 1) * resultsPerPage;
    const url = `${apiURL}?offset=${offset}&limit=${resultsPerPage}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed fetch data');
        }
        return response.json();
      })
      .then((data) => {
        setPokemons(data.results);
        setFilteredPokemons(data.results);
        setIsLoading(false);

        const numberOfPages = Math.ceil(data.count / resultsPerPage);

        const currentPage = page ? parseInt(page, 10) : 1;
        const links = [];
        for (let i = 1; i <= numberOfPages; i++) {
          links.push(
            <Link
              className={`${paginationStyle['divider']} ${i === currentPage ? paginationStyle['currentpage'] : ''}`}
              key={i}
              to={`/search/${i}`}
              style={{ fontWeight: i === currentPage ? 'bold' : 'normal' }}
            >
              {i}
            </Link>
          );
        }

        setPaginationLinks(links);
      })
      .catch((error) => {
        console.error('Error fetch data:', error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadPokemons(page ? parseInt(page, 10) : 1);
  }, [page]);

  const handleSearch = (event: FormEvent<Element>) => {
    event.preventDefault();
    setIsLoading(true);
    const filtered = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredPokemons(filtered);
    setIsLoading(false);
    localStorage.setItem('searchTerm', searchQuery);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchQuery = event.target.value;
    setSearchQuery(newSearchQuery);
    localStorage.setItem('searchTerm', newSearchQuery);
  };

  const handlePokemonClick = (pokemonName: string) => {
    navigate(`/?page=${page}&details=${pokemonName}`);
  };
  console.log('details' + details);

  return (
    <div className={SearchResultsStyle['page']}>
      <div className={SearchResultsStyle['left-section']}>
        <h1>Pokemon Search</h1>
        <form onSubmit={handleSearch}>
          <input type="text" value={searchQuery} onChange={handleInputChange} />
          <button type="submit">Search</button>
        </form>
        {isLoading ? <div>Loading...</div> : (
          <ul>
            {filteredPokemons.map((pokemon, index) => (
              <li key={index} onClick={() => handlePokemonClick(pokemon.name)}>
                {pokemon.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={SearchResultsStyle['right-section']}>2
        {details && <PokemonDetails name={details} />}
        <Outlet />
      </div>
      <div className={paginationStyle['pagination-box']}>
        {paginationLinks}
      </div>
    </div>
  );
};

export default SearchResults;
