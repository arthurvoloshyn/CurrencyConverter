import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import getListAction from '../store/actions/getListCurrency';

function Converter() {
  const dispatch = useDispatch();

  const valute = useSelector(state => state.valute);

  const [options, setOptions] = useState(['EUR', 'AUD', 'GBP']);

  const [dataF1, setDataF1] = useState({
    label: '',
    input: 1,
    select: '',
    value: '',
  });
  const [dataF2, setDataF2] = useState({
    label: '',
    input: 1,
    select: '',
    value: '',
  });

  // --Make First Call to the API
  useEffect(() => {
    if (!Object.keys(valute).length) dispatch(getListAction());
  }, [dispatch, valute]);

  // --Populate Data
  useEffect(() => {
    if (Object.keys(valute).length) {
      const keys = Object.keys(valute);
      setOptions(keys);

      setDataF1({
        label: valute[keys[0]].Name,
        input: 1,
        select: keys[0],
        value: valute[keys[0]].Value,
      });
      setDataF2({
        label: valute[keys[1]].Name,
        input: 1,
        select: keys[1],
        value: valute[keys[1]].Value,
      });
    }
  }, [valute]);

  // --Convert Currency
  const convert = useCallback(
    // eslint-disable-next-line consistent-return
    (inputData = 1) => {
      if (!dataF1.value || !dataF2.value || Number.isNaN(inputData)) return 0;

      const index = dataF1.value / dataF2.value;

      let result = inputData * index;
      result = result.toFixed(2);

      setDataF2(prev => ({ ...prev, input: result }));
    },
    [dataF1.value, dataF2.value],
  );

  useEffect(() => {
    const selValueF1 = dataF1.select;

    if (selValueF1 && valute[selValueF1]) convert(dataF1.input);
  }, [dataF1.select, dataF2.select, dataF1.input, valute, convert]);

  const resetFormState = (ev, setStateF) => {
    const selected = ev.target.value;

    if (selected && valute[selected]) {
      setStateF(prev => ({
        ...prev,
        select: selected,
        label: valute[selected].Name,
        value: valute[selected].Value,
      }));
    }
  };

  const reverseData = () => {
    const memorizeDataF1 = dataF1;
    const memorizeDataF2 = dataF2;

    setDataF1(memorizeDataF2);
    setDataF2(memorizeDataF1);
  };

  const elOptionList = options => {
    return options.map(el => {
      return (
        <option key={el} value={el}>
          {el}
        </option>
      );
    });
  };

  return (
    <Container className="converter_wrapper">
      <Row>
        {/* ---Form №1--- */}
        <Col sm={5} xs>
          <form className="converter_1">
            <label htmlFor="form1">{dataF1.label}</label>
            <br />
            <select
              className="converter_form_select"
              onChange={ev => resetFormState(ev, setDataF1)}
              value={dataF1.select}
            >
              {elOptionList(options)}
            </select>
            <input
              id="form1"
              onChange={({ target: { value } }) =>
                setDataF1(prev => ({ ...prev, input: value }))
              }
              type="text"
              value={dataF1.input}
            />
          </form>
        </Col>

        {/* ---Reverse Button--- */}
        <Col
          className="converter_arrow"
          onClick={reverseData}
          sm="auto"
          xs="auto"
        >
          &#x2194;
        </Col>

        {/* ---Form №2--- */}
        <Col sm={5} xs>
          <form className="converter_2">
            <label htmlFor="form2">{dataF2.label}</label>
            <br />
            <select
              className="converter_form_select"
              onChange={ev => resetFormState(ev, setDataF2)}
              value={dataF2.select}
            >
              {elOptionList(options)}
            </select>
            <input disabled id="form2" type="text" value={dataF2.input} />
          </form>
        </Col>
      </Row>
    </Container>
  );
}

export default Converter;
