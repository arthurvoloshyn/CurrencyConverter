import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

import {
  currencySelectors,
  currencyOperations,
} from '../../state/ducks/currency';

const Converter = () => {
  const { selectCurrency } = currencySelectors;
  const { getCurrencyList } = currencyOperations;

  const dispatch = useDispatch();
  const currency = useSelector(selectCurrency);
  const [currencyOptions, setCurrencyOptions] = useState(['EUR', 'AUD', 'GBP']);

  const defaultCurrencyForm = {
    label: '',
    input: 1,
    select: '',
    value: '',
  };
  const [[leftCurrencyForm, rightCurrencyForm], setCurrencyForms] = useState([
    defaultCurrencyForm,
    defaultCurrencyForm,
  ]);

  const currencyTickers = Object.keys(currency);

  useEffect(() => {
    if (!currencyTickers.length) dispatch(getCurrencyList());
  }, [dispatch, currency, getCurrencyList, currencyTickers.length]);

  useEffect(() => {
    if (currencyTickers.length) {
      setCurrencyOptions(currencyTickers);

      const updateCurrencyForm = currencyTicker => ({
        label: currency[currencyTicker].Name,
        input: 1,
        select: currencyTicker,
        value: currency[currencyTicker].Value,
      });

      const [firstCurrencyTickers, secondCurrencyTickers] = currencyTickers;
      setCurrencyForms([
        updateCurrencyForm(firstCurrencyTickers),
        updateCurrencyForm(secondCurrencyTickers),
      ]);
    }
  }, [currency, currencyTickers.length]); // eslint-disable-line react-hooks/exhaustive-deps, max-len

  const updateCurrencyFormsByIndex = (currencyFormIndex, data) =>
    setCurrencyForms(prevCurrencyForms =>
      [...prevCurrencyForms].map((currencyForm, index) =>
        index === currencyFormIndex
          ? { ...currencyForm, ...data }
          : currencyForm,
      ),
    );

  const convert = useCallback(
    // eslint-disable-next-line consistent-return
    (inputData = 1) => {
      if (
        !leftCurrencyForm.value ||
        !rightCurrencyForm.value ||
        Number.isNaN(inputData)
      ) {
        return 0;
      }

      const index = leftCurrencyForm.value / rightCurrencyForm.value;

      let result = inputData * index;
      result = result.toFixed(2);

      updateCurrencyFormsByIndex(1, { input: result });
    },
    [leftCurrencyForm.value, rightCurrencyForm.value],
  );

  useEffect(() => {
    const leftCurrencyFormSelValue = leftCurrencyForm.select;

    if (leftCurrencyFormSelValue && currency[leftCurrencyFormSelValue]) {
      convert(leftCurrencyForm.input);
    }
  }, [
    leftCurrencyForm.select,
    rightCurrencyForm.select,
    leftCurrencyForm.input,
    currency,
    convert,
  ]);

  const resetFormState = (selected, currencyFormIndex) => {
    if (selected && currency[selected]) {
      const { Name, Value } = currency[selected];

      updateCurrencyFormsByIndex(currencyFormIndex, {
        select: selected,
        label: Name,
        value: Value,
      });
    }
  };

  const reverseData = () =>
    setCurrencyForms([rightCurrencyForm, leftCurrencyForm]);

  const currencySelectOptionList = (
    <>
      {currencyOptions.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </>
  );

  const currencyForm = (currencyForm, index, className, id, disabled) => {
    const handleChange = ({ target: { value } }) =>
      updateCurrencyFormsByIndex(index, { input: value });

    const handleResetFormState = ({ target: { value } }) =>
      resetFormState(value, index);

    return (
      <Col sm={5} xs>
        <form className={className}>
          <label htmlFor={id}>{currencyForm.label}</label>
          <br />
          <select
            className="converter_form_select"
            onChange={handleResetFormState}
            value={currencyForm.select}
          >
            {currencySelectOptionList}
          </select>
          <input
            disabled={disabled}
            id={id}
            onChange={handleChange}
            type="text"
            value={currencyForm.input}
          />
        </form>
      </Col>
    );
  };

  const getLeftCurrencyForm = currencyForm(
    leftCurrencyForm,
    0,
    'converter_1',
    'leftCurrencyForm',
  );
  const getRightCurrencyForm = currencyForm(
    rightCurrencyForm,
    1,
    'converter_2',
    'rightCurrencyForm',
    true,
  );

  return (
    <Container className="converter_wrapper">
      <Row>
        {getLeftCurrencyForm}

        <Col
          className="converter_arrow"
          onClick={reverseData}
          sm="auto"
          xs="auto"
        >
          &#x2194;
        </Col>

        {getRightCurrencyForm}
      </Row>
    </Container>
  );
};

export default Converter;
