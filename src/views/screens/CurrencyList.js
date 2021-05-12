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
  const [searchValue, setSearchValue] = useState(defaultCurrency);

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
      .filter(index => {
        const cName = defaultCurrency[index].Name;
        const charCode = defaultCurrency[index].CharCode;
        const cReg = new RegExp(`.*${searchValue}.*`, 'i');

        return cReg.test(cName) || cReg.test(charCode);
      })
      .forEach(index => {
        filteredData[index] = defaultCurrency[index];
      });

    if (Object.keys(filteredData).length) setCurrency(filteredData);
  };

  const createList = (currencyData, CurrencyComponent) => {
    return Object.keys(currencyData).map(key => {
      const { ID, Value, Previous, Name, Nominal, CharCode } = currencyData[
        key
      ];

      return (
        <CurrencyComponent
          key={ID}
          CharCode={CharCode}
          Name={Name}
          Nominal={Nominal}
          Previous={Previous}
          Value={Value}
        />
      );
    });
  };

  const handleSearchValue = ({ target: { value } }) => setSearchValue(value);

  return (
    <div className="currency_list_wrapper ">
      <SearchForm
        onChange={handleSearchValue}
        searchData={searchData}
        value={searchValue}
      />
      {Object.keys(currency).length ? (
        createList(currency, CurrencyComponent)
      ) : (
        <Spinner animation="border" className="align-self-center " />
      )}
    </div>
  );
}

export default CurrencyList;
