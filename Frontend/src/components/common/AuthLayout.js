import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/auth.css';
import { Container } from 'reactstrap';

const AuthLayout = props => {
  return (
    <Container className="authContainer" fluid={true}>
      {props.children}
    </Container>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node
};

export default AuthLayout;
