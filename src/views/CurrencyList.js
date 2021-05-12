import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import Spinner from 'react-bootstrap/Spinner';

import getListAction from '../store/actions/getListCurrency';
import CurrencyComponent from '../components/CurrencyComponent';
import SearchForm from '../components/SearchForm';

function CurrencyList() {
  const dispatch = useDispatch();

  const valute = useSelector(state => state.valute, shallowEqual);

  const [currency, setCurrency] = useState(valute);

  useEffect(() => {
    dispatch(getListAction());
  }, [dispatch]);
  useEffect(() => {
    setCurrency(valute);
  }, [valute]);

  const searchData = e => {
    e.preventDefault();

    const searchValue = e.target[0].value;
    const filteredData = {};

    Object.keys(valute)
      .filter(index => {
        const cName = valute[index].Name;
        const charCode = valute[index].CharCode;
        const cReg = new RegExp(`.*${searchValue}.*`, 'i');

        return cReg.test(cName) || cReg.test(charCode);
      })
      .forEach(index => {
        filteredData[index] = valute[index];
      });

    if (Object.keys(filteredData).length) setCurrency(filteredData);
  };

  const createList = (currencyData, CurrencyComponent) => {
    return Object.keys(currencyData).map(key => {
      const obgEl = currencyData[key];

      return <CurrencyComponent key={obgEl.ID} currency={obgEl} />;
    });
  };

  return (
    <div className="currency_list_wrapper ">
      <SearchForm searchData={searchData} />
      {Object.keys(currency).length ? (
        createList(currency, CurrencyComponent)
      ) : (
        <Spinner animation="border" className="align-self-center " />
      )}
    </div>
  );
}

export default CurrencyList;
