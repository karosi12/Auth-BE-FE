import React from 'react';
import { Button, Form, Spinner } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import AuthLayout from '../components/common/AuthLayout';
import FormContainer from '../components/common/FormContainer';
import TextField from '../components/common/TextField';
import { resetPassword } from '../store/slice/authSlice';
import ErrorAlertNotification from '../components/common/Error';

// React method that handles the display of user password reset form and it functionality
const ResetPasswordPage = props => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  const {
    isLoading,
    error,
    isChangePassword
  } = useSelector(state => state.authReducer);


  const onSubmit = async data => {
    // get the browser link and split into an array starting from /
    const { email, password } = data;
    const reqPayload = {
      email,
      password,
    };
    await dispatch(resetPassword(reqPayload));
  };

  if (isChangePassword) {
    return <Redirect to="/login" />
  }

  return (
    <AuthLayout>
      <FormContainer formTitle="Reset Password">
      {
          error && (
            <ErrorAlertNotification errors={error} />
          )
        }
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Your Email Address"
            register={register({
              required: 'This email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'invalid email address'
              }
            })}
            errors={errors.email}
            type="email"
            name="email"
          />
          <TextField
          label="Your Password"
          register={register({
            required: 'This password is required',
            minLength: {
              value: 8,
              message: 'Password must have at least 8 characters'
            }
          })}
          errors={errors.password}
          type="password"
          name="password"
        />
          <Button className="authButton mt-2 mb-4" outline={false}>
            {isLoading ? <Spinner color="light" size="sm" /> : null}
            {'  '}
            Reset Password
          </Button>
          <div className="text-center">
            <p>
              Remember Password? &nbsp;
              <Link className="authTextBottom" to="/login">
                Login
              </Link>
            </p>
          </div>
        </Form>
      </FormContainer>
    </AuthLayout>
  );
};

ResetPasswordPage.propTypes = {
  isLoading: PropTypes.bool
};

export default ResetPasswordPage;
