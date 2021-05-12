import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { Spinner } from 'react-bootstrap';

import {
  currencySelectors,
  currencyOperations,
} from '../../state/ducks/currency';
import CurrencyComponent from '../components/CurrencyComponent';
import SearchForm from '../components/SearchForm';

function CurrencyList() {
  const { selectCurrency } = currencySelectors;
  const { getCurrencyList } = currencyOperations;

  const dispatch = useDispatch();
  const defaultCurrency = useSelector(selectCurrency, shallowEqual);
  const [currency, setCurrency] = useState(defaultCurrency);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    dispatch(getCurrencyList());
  }, [dispatch, getCurrencyList]);

  useEffect(() => {
    setCurrency(defaultCurrency);
  }, [defaultCurrency]);

  const searchData = e => {
    e.preventDefault();

    const filteredData = {};

    Object.keys(defaultCurrency)
      .filter(ticker => {
        const { Name, CharCode } = defaultCurrency[ticker];
        const currencySearchRegExp = new RegExp(`.*${searchValue}.*`, 'i');

        return (
          currencySearchRegExp.test(Name) || currencySearchRegExp.test(CharCode)
        );
      })
      .forEach(ticker => (filteredData[ticker] = defaultCurrency[ticker]));

    if (Object.keys(filteredData).length) setCurrency(filteredData);
  };

  const handleSearchValue = ({ target: { value } }) => setSearchValue(value);

  const currencyData = Object.values(currency);

  return (
    <div className="currency_list_wrapper ">
      <SearchForm
        onChange={handleSearchValue}
        searchData={searchData}
        value={searchValue}
      />
      {currencyData ? (
        <>
          {currencyData.map(
            ({ ID, Value, Previous, Name, Nominal, CharCode }) => (
              <CurrencyComponent
                key={ID}
                CharCode={CharCode}
                Name={Name}
                Nominal={Nominal}
                Previous={Previous}
                Value={Value}
              />
            ),
          )}
        </>
      ) : (
        <Spinner animation="border" className="align-self-center " />
      )}
    </div>
  );
}

export default CurrencyList;
