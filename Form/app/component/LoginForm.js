import React, { useState } from 'react';
import {  StyleSheet, Text } from 'react-native';
import client from '../api/client'; // Import API client for making requests
import { isValidEmail, isValidObjField, updateError } from '../utils/methods'; // Import validation methods
import { useLogin } from '../context/LoginProvider'; // Import login context
import FormContainer from './FormContainer'; // Import container component for form layout
import FormInput from './FormInput'; // Import input component
import FormSubmitButton from './FormSubmitButton'; // Import submit button component

// Functional component for the login form
const LoginForm = () => {
  const { setIsLoggedIn } = useLogin(); // Accessing setIsLoggedIn from context
  const [userInfo, setUserInfo] = useState({
    email: '', // Email field state
    password: '', // Password field state
  });

  const [error, setError] = useState(''); // Error message state

  const { email, password } = userInfo; // Destructure userInfo state

   // Handles text input changes
  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value }); // Update userInfo state dynamically
  };

  // Validates the form fields
  const isValidForm = () => {
    if (!isValidObjField(userInfo))  // Check if fields are not empty
      return updateError('Required all fields!', setError);  // Set error message if any field is missing

    if (!isValidEmail(email)) return updateError('Invalid email!', setError); // Validate email format

    if (!password.trim() || password.length < 8) // Check password length
      return updateError('Password is too short!', setError); // Set error if password is invalid

    return true; // Return true if all fields are valid
  };

  // Handles form submission
  const submitForm = async () => {
    if (isValidForm()) { // Only submit if the form is valid
      try {
        const res = await client.post('/sign-in', { ...userInfo }); // Only submit if the form is valid

        if (res.data.success) { // If login is successful
          setUserInfo({ email: '', password: '' }); // Reset form fields
          setIsLoggedIn(true);  // Update login state
        }

        console.log(res.data); // Log API response
      } catch (error) {
        console.log(error); // Log error if API call fails
      }
    }
  };

  return (
    <FormContainer>
       
      {error ? (
        <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>
          {error}
        </Text>
      ) : null}

     
      <FormInput
        value={email}
        onChangeText={value => handleOnChangeText(value, 'email')}
        label='Email'
        placeholder='example@email.com'
        autoCapitalize='none'
      />

      
      <FormInput
        value={password}
        onChangeText={value => handleOnChangeText(value, 'password')}
        label='Password'
        placeholder='********'
        autoCapitalize='none'
        secureTextEntry
      />
       
      <FormSubmitButton onPress={submitForm} title='Login' />
    </FormContainer>
  );
};

const styles = StyleSheet.create({});

export default LoginForm; // Export the component for use in other parts of the app