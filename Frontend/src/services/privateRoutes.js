/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../store/slice/authSlice';

const PrivateRoutes = (ComposedComponent) => {
  /**
 * @class Authenticate
 */
  class Authenticate extends Component {
    // eslint-disable-next-line require-jsdoc
    componentDidMount() {
      const token = localStorage.getItem('token')
      if (!token) {
        const { Logout } = this.props;
        Logout()
        window.location.href = '/login';
      }
    }

    /**
   *
   * @returns {*} - render
   */
    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propsTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    match: PropTypes.shape({}).isRequired,
    Logout: PropTypes.func,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  Authenticate.contextTypes = {
    router: PropTypes.shape({})
  };

  const mapDispatchToProps = dispatch => ({
    Logout: () => dispatch(logoutUser())
  });

  return connect(null, mapDispatchToProps)(Authenticate);
};

export default PrivateRoutes;
