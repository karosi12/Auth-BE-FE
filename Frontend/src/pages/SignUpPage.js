import React, { useRef } from 'react';
import { Form, Button, Spinner } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AuthLayout from '../components/common/AuthLayout';
import AuthFormContainer from '../components/common/FormContainer';
import TextField from '../components/common/TextField';
import { registerUser } from '../store/slice/authSlice';
import ErrorAlertNotification from '../components/common/Error';

const SignUpPage = () => {
  const { register, handleSubmit, errors, watch } = useForm();

  const dispatch = useDispatch()
  const {
    isLoading,
    error,
    isSuccessful
  } = useSelector(state => state.authReducer)

  // reference password in other to validate user input
  const password = useRef({});
  password.current = watch('password', '');

  // Method that handles the submission of register admin form
  const onSubmit = async data => {
    const { password, fullName, email } = data;

    // restructure all required user data
    const requestPayload = {
      email,
      password,
      fullName,
    };

    // dispatch the action that create and register a user.
    dispatch(registerUser(requestPayload))
  };

  if(isSuccessful) {
    return <Redirect to='/books' />
  }

  return (
    <AuthLayout>
      <AuthFormContainer formTitle="Create Your Account">
        {
          error && (
            <ErrorAlertNotification errors={error} />
          )
        }
        <Form onSubmit={handleSubmit(onSubmit)}>
        <TextField
            label="Full Name"
            register={register({
              required: 'This field is required',
            })}
            errors={errors.fullName}
            type="text"
            name="fullName"
          />
          <TextField 
            label="Email Address"
            register={register({
              required: 'This field is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address"
                      }
            })}
            type="email"
            name="email"
            errors={errors.email}
          />
          <TextField
            label="Choose Password"
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
          <TextField
            label="Retype Password"
            register={register({
              required: 'This confirm password field is required',
              validate: value =>
                value === password.current || 'The passwords do not match'
            })}
            errors={errors.confirmPassword}
            type="password"
            name="confirmPassword"
          />
          <Button
            className="authButton mt-2 mb-4"
            outline={false}
            >
            {isLoading ? <Spinner color="light" size="sm" /> : null}
            {'  '}
            Create my account
          </Button>
          <div className="text-center">
            <Link className="authTextBottom" to="/login">
              Have an Account? Login
            </Link>
          </div>
        </Form>
      </AuthFormContainer>
    </AuthLayout>
  )
}

export default SignUpPage;