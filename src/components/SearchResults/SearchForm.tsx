
import React from 'react';

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

export default SearchForm;
