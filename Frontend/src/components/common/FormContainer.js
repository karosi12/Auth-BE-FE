import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';

const AuthFormContainer = props => {
  return (
    <Container className="formContainer mt-4" fluid={true} sm="1">
      <div className="text-center">
        <h3 className="mb-4 formTitle">{props.formTitle}</h3>
      </div>
      {props.children}
    </Container>
  );
};

AuthFormContainer.propTypes = {
  children: PropTypes.node,
  formTitle: PropTypes.string
};

export default AuthFormContainer;