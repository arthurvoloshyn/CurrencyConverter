import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';

const CurrencyComponent = ({ CharCode, Value, Previous, Name, Nominal }) => {
  const mainCurrency = 'RUB';

  const delta = Value - Previous;
  const precisionDelta = delta.toPrecision(4);

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
        {Name}{' '}
      </Row>

      <Row className="currency_data_wrapper" sm="auto" xs="auto">
        <Col sm={7} xs={7}>
          <Row>
            <Col className="p-0" sm="auto" xs="auto">
              {`${Nominal} ${CharCode}`}
            </Col>

            <Col className="text-center p-0" sm={2} xs={2}>
              &#x2194;
            </Col>

            <Col className="p-0" sm="auto" xs="auto">
              {`${Value} ${mainCurrency}`}
            </Col>
          </Row>
        </Col>

        <Col className="ml-sm-4" sm={4} xs={4}>
          <Row
            className="delta_wrapper"
            style={{ color: precisionDelta > 0 ? 'green' : 'red' }}
          >
            {precisionDelta > 0 ? arrowUp : arrowDown}
            <Col className="ml-2 text-left">{precisionDelta}</Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

CurrencyComponent.propTypes = {
  CharCode: PropTypes.string,
  Name: PropTypes.string,
  Nominal: PropTypes.number,
  Previous: PropTypes.number,
  Value: PropTypes.number,
};

CurrencyComponent.defaultProps = {
  CharCode: '',
  Name: '',
  Nominal: 0,
  Previous: 0,
  Value: 0,
};

export default CurrencyComponent;
