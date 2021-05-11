import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getListAction } from '../store/actions/getListCurrency';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Converter() {
  const dispatch = useDispatch();

  const valute = useSelector(state => state.valute);

  let [options, setOptions] = useState(['EUR', 'AUD', 'GBP']);

  let [dataF1, setDataF1] = useState({
    label: '',
    input: 1,
    select: '',
    value: '',
  });
  let [dataF2, setDataF2] = useState({
    label: '',
    input: 1,
    select: '',
    value: '',
  });

  //--Make First Call to the API
  useEffect(() => {
    if (!Object.keys(valute).length) dispatch(getListAction());
  }, [dispatch, valute]);

  //--Populate Data
  useEffect(() => {
    if (Object.keys(valute).length) {
      let keys = Object.keys(valute);
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

  //--Convert Currency
  useEffect(() => {
    let selValueF1 = dataF1.select;

    if (selValueF1 && valute[selValueF1]) convert(dataF1.input);
  }, [dataF1.select, dataF2.select, dataF1.input, valute]);

  const resetFormState = (ev, setStateF) => {
    let selected = ev.target.value;

    if (selected && valute[selected]) {
      setStateF(prev => ({
        ...prev,
        select: selected,
        label: valute[selected].Name,
        value: valute[selected].Value,
      }));
    }
  };

  const convert = (inputData = 1) => {
    if (!dataF1.value || !dataF2.value || isNaN(inputData)) return 0;

    let index = dataF1.value / dataF2.value;

    let result = inputData * index;
    result = result.toFixed(2);

    setDataF2(prev => ({ ...prev, input: result }));
  };
  const reverseData = () => {
    let memorize_1 = dataF1;
    let memorize_2 = dataF2;

    setDataF1(memorize_2);
    setDataF2(memorize_1);
  };

  const elOptionList = options => {
    return options.map(el => {
      return (
        <option value={el} key={el}>
          {el}
        </option>
      );
    });
  };

  return (
    <Container className="converter_wrapper">
      <Row>
        {/* ---Form №1--- */}
        <Col xs={true} sm={5}>
          <form className="converter_1">
            <label>{dataF1.label}</label>
            <br />
            <select
              onChange={ev => resetFormState(ev, setDataF1)}
              value={dataF1.select}
              className="converter_form_select"
            >
              {elOptionList(options)}
            </select>
            <input
              onChange={ev =>
                setDataF1(prev => ({ ...prev, input: ev.target.value }))
              }
              value={dataF1.input}
              type="text"
            />
          </form>
        </Col>

        {/* ---Reverse Button--- */}
        <Col
          onClick={reverseData}
          xs="auto"
          sm="auto"
          className="converter_arrow"
        >
          &#x2194;
        </Col>

        {/* ---Form №2--- */}
        <Col xs={true} sm={5}>
          <form className="converter_2">
            <label>{dataF2.label}</label>
            <br />
            <select
              onChange={ev => resetFormState(ev, setDataF2)}
              value={dataF2.select}
              className="converter_form_select"
            >
              {elOptionList(options)}
            </select>
            <input type="text" value={dataF2.input} disabled />
          </form>
        </Col>
      </Row>
    </Container>
  );
}

export default Converter;
