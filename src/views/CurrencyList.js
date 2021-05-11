import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import Spinner from 'react-bootstrap/Spinner';

import { getListAction } from '../store/actions/getListCurrency';
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

    let searchValue = e.target[0].value;
    let filteredData = {};

    Object.keys(valute)
      .filter(index => {
        let cName = valute[index].Name;
        let charCode = valute[index].CharCode;
        let cReg = new RegExp(`.*${searchValue}.*`, 'i');

        return cReg.test(cName) || cReg.test(charCode);
      })
      .map(index => {
        filteredData[index] = valute[index];
      });

    if (Object.keys(filteredData).length) setCurrency(filteredData);
  };

  const createList = (currencyData, CurrencyComponent) => {
    return Object.keys(currencyData).map(function(key, index) {
      let obgEl = currencyData[key];

      return <CurrencyComponent currency={obgEl} key={obgEl.ID} />;
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
