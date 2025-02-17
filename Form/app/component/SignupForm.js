import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { isValidEmail, isValidObjField, updateError } from '../utils/methods';

import FormContainer from './FormContainer';
import FormInput from './FormInput';
import FormSubmitButton from './FormSubmitButton';

import { Formik } from 'formik';
import * as Yup from 'yup';

import client from '../api/client';

// Validation schema using Yup for form fields
const validationSchema = Yup.object({
  fullName: Yup.string()
    .trim()
    .min(3, 'Invalid name!') // Minimum length of 3 for full name
    .required('Name is required!'),
  email: Yup.string().email('Invalid email!').required('Email is required!'),
  password: Yup.string()
    .trim()
    .min(8, 'Password is too short!') // Minimum length of 8 for password
    .required('Password is required!'),
  confirmPassword: Yup.string().equals(
    [Yup.ref('password'), null], // Confirm password must match the password
    'Password does not match!'
  ),
});

const SignupForm = ({ navigation }) => {
  const userInfo = { // Initial user information state
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const [error, setError] = useState(''); // Error state for displaying error messages

  const { fullName, email, password, confirmPassword } = userInfo;

  // Function to handle changes in input fields
  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  // Function to validate the form before submission
  const isValidForm = () => {
    // we will accept only if all of the fields have value
    if (!isValidObjField(userInfo))
      return updateError('Required all fields!', setError);
    // if valid name with 3 or more characters
    if (!fullName.trim() || fullName.length < 3)
      return updateError('Invalid name!', setError);
    // only valid email id is allowed
    if (!isValidEmail(email)) return updateError('Invalid email!', setError);
    // password must have 8 or more characters
    if (!password.trim() || password.length < 8)
      return updateError('Password is less than 8 characters!', setError);
    // password and confirm password must be the same
    if (password !== confirmPassword)
      return updateError('Password does not match!', setError);

    return true; // Return true if all validations pass
  };

  // Function to handle form submission
  const sumbitForm = () => {
    if (isValidForm()) {  // Proceed only if the form is valid
      // submit form
      console.log(userInfo); // Log user info (you can replace this with the actual form submission)
    }
  };

   // Function to sign up the user
  const signUp = async (values, formikActions) => {
    try {
      const res = await client.post('/create-user', {
        ...values, // API request to create user
      });

      if (res.data.success) {
        const signInRes = await client.post('/sign-in', {
          email: values.email,
          password: values.password,
        });

        if (signInRes.data.success) {
          // Remove image upload navigation
          navigation.replace('Home');  // Replace with your desired screen
        }
      }

      formikActions.resetForm();  // Reset form after successful submission
      formikActions.setSubmitting(false); // Stop submitting state
    } catch (err) {
      formikActions.setSubmitting(false); // Stop submitting state on error
      console.error('Error during sign up:', err);
      setError('There was an issue with the server. Please try again later.'); // Display error message

    }
  };

  return (
    <FormContainer>
      <Formik
        initialValues={userInfo}
        validationSchema={validationSchema}
        onSubmit={signUp}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          const { fullName, email, password, confirmPassword } = values;
          return (
            <>
              <FormInput
                value={fullName}
                error={touched.fullName && errors.fullName}
                onChangeText={handleChange('fullName')}
                onBlur={handleBlur('fullName')}
                label='Full Name'
                placeholder='John Smith'
              />
              <FormInput
                value={email}
                error={touched.email && errors.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                autoCapitalize='none'
                label='Email'
                placeholder='example@email.com'
              />
              <FormInput
                value={password}
                error={touched.password && errors.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                autoCapitalize='none'
                secureTextEntry
                label='Password'
                placeholder='********'
              />
              <FormInput
                value={confirmPassword}
                error={touched.confirmPassword && errors.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                autoCapitalize='none'
                secureTextEntry
                label='Confirm Password'
                placeholder='********'
              />
              <FormSubmitButton
                submitting={isSubmitting}
                onPress={handleSubmit}
                title='Sign up'
              />
            </>
          );
        }}
      </Formik>
    </FormContainer>
  );
};

const styles = StyleSheet.create({});

export default SignupForm;
