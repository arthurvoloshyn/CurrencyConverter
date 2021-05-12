import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ title, description, subTitle }) => (
  <div className="error">
    <div className="container">
      {subTitle && <h2>{subTitle}</h2>}
      <h1>{title}</h1>
      <p>{description}</p>
      <a href="/">Go back home</a>
    </div>
  </div>
);

Error.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  subTitle: PropTypes.string,
};

Error.defaultProps = {
  title: '404',
  description: "We can't find the page you're looking for.",
  subTitle: '',
};

export default Error;
