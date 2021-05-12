import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';

function SearchForm({ searchData }) {
  return (
    <form className="searchForm" onSubmit={searchData}>
      <input placeholder="Type to search..." type="text" />
      <Button size="sm" type="submit" variant="primary">
        Search
      </Button>
    </form>
  );
}

SearchForm.propTypes = {
  searchData: PropTypes.func,
};

SearchForm.defaultProps = {
  searchData: () => {},
};

export default SearchForm;
