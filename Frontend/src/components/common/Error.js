import React from 'react';
import PropTypes from 'prop-types';

/**
 * Error alert notification
 * @param {*} props - Response object
 * @returns {*} props.errors - with props.errors
 */
const ErrorAlertNotification = (props) => {
  const { errors } = props;
  return (
    <div className="alert alert-danger" role="alert">
      <strong>{errors}</strong>
    </div>
  );
};

ErrorAlertNotification.propTypes = {
  errors: PropTypes.string,
};

export default ErrorAlertNotification;