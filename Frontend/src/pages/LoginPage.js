import React from 'react';
import { Form, Button, Spinner } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { Link, Redirect } from 'react-router-dom';
import AuthLayout from '../components/common/AuthLayout';
import AuthFormContainer from '../components/common/FormContainer';
import TextField from '../components/common/TextField';
import { loginUser } from '../store/slice/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import ErrorAlertNotification from '../components/common/Error';

const LoginPage = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();

  // Method that handles the submission of register admin form
  const onSubmit = async data => {
    const { password, email } = data;

    // restructure all required user data
    const requestPayload = {
      email,
      password,
    };
    // dispatch the action that create and register a user.
    await dispatch(loginUser(requestPayload))
  };

  const {
    isLoading,
    error,
    isSuccessful
  } = useSelector(state => state.authReducer);

  if (isSuccessful) {
    return <Redirect to="/books" />
  }

  return (
  <AuthLayout>
    <AuthFormContainer formTitle="Login">
      <Form onSubmit={handleSubmit(onSubmit)}>
      {
          error && (
            <ErrorAlertNotification errors={error} />
          )
        }
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
            Login
          </Button>
          <div className="text-center">
            <Link className="authTextBottom" to="/reset-password">
              Forget Password?
            </Link>
          </div>
      </Form>
    </AuthFormContainer>
  </AuthLayout>
  )
}

export default LoginPage;
