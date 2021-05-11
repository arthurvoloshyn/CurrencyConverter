import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function CurrencyComponent({ currency }) {
  const mainCurrency = 'RUB';

  let delta = currency.Value - currency.Previous;
  delta = delta.toPrecision(4);

  const arrowUp = (
    <Col xs={1} sm={1}>
      &#x2191;
    </Col>
  );
  const arrowDown = (
    <Col xs={1} sm={1}>
      &#x2193;
    </Col>
  );

  return (
    <Container className="currency_element">
      <Row xs={true} sm={true} className="currency_el_label">
        {' '}
        {currency.Name}{' '}
      </Row>

      <Row xs="auto" sm="auto" className="currency_data_wrapper">
        <Col xs={7} sm={7}>
          <Row>
            <Col xs="auto" sm="auto" className="p-0">
              {currency.Nominal + ` ` + currency.CharCode}
            </Col>

            <Col xs={2} sm={2} className="text-center p-0">
              &#x2194;
            </Col>

            <Col xs="auto" sm="auto" className="p-0">
              {currency.Value + ' ' + mainCurrency}
            </Col>
          </Row>
        </Col>

        <Col xs={4} sm={4} className="ml-sm-4">
          <Row
            className="delta_wrapper"
            style={{ color: delta > 0 ? 'green' : 'red' }}
          >
            {delta > 0 ? arrowUp : arrowDown}
            <Col className="ml-2">{delta}</Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
