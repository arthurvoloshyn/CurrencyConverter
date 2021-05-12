import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const SearchForm = ({ searchData, value, onChange }) => (
  <form className="searchForm" onSubmit={searchData}>
    <input
      onChange={onChange}
      placeholder="Type to search..."
      type="text"
      value={value}
    />
    <Button size="sm" type="submit" variant="primary">
      Search
    </Button>
  </form>
);

SearchForm.propTypes = {
  searchData: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

SearchForm.defaultProps = {
  searchData: () => {},
  onChange: () => {},
  value: '',
};

export default SearchForm;
