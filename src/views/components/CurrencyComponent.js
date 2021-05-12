import React from 'react';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function CurrencyComponent({ currency }) {
  const mainCurrency = 'RUB';

  let delta = currency.Value - currency.Previous;
  delta = delta.toPrecision(4);

  const arrowUp = (
    <Col sm={1} xs={1}>
      &#x2191;
    </Col>
  );
  const arrowDown = (
    <Col sm={1} xs={1}>
      &#x2193;
    </Col>
  );

  return (
    <Container className="currency_element">
      <Row className="currency_el_label" sm xs>
        {' '}
        {currency.Name}{' '}
      </Row>

      <Row className="currency_data_wrapper" sm="auto" xs="auto">
        <Col sm={7} xs={7}>
          <Row>
            <Col className="p-0" sm="auto" xs="auto">
              {`${currency.Nominal} ${currency.CharCode}`}
            </Col>

            <Col className="text-center p-0" sm={2} xs={2}>
              &#x2194;
            </Col>

            <Col className="p-0" sm="auto" xs="auto">
              {`${currency.Value} ${mainCurrency}`}
            </Col>
          </Row>
        </Col>

        <Col className="ml-sm-4" sm={4} xs={4}>
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

CurrencyComponent.propTypes = {
  currency: PropTypes.shape({
    CharCode: PropTypes.string,
    ID: PropTypes.string,
    Name: PropTypes.string,
    Nominal: PropTypes.number,
    Previous: PropTypes.number,
    Value: PropTypes.number,
  }),
};

CurrencyComponent.defaultProps = {
  currency: {
    CharCode: '',
    ID: '',
    Name: '',
    Nominal: 0,
    Previous: 0,
    Value: 0,
  },
};
