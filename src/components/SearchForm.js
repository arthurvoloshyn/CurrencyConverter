import React from 'react';

import Button from 'react-bootstrap/Button';

function SearchForm({ searchData }) {
  return (
    <form className="searchForm" onSubmit={searchData}>
      <input type="text" placeholder="Type to search..." />
      <Button type="submit" variant="primary" size="sm">
        Search
      </Button>
    </form>
  );
}

export default SearchForm;
