import React, { useState } from 'react'; 
import { StyleSheet, ScrollView, KeyboardAvoidingView, Platform, View } from 'react-native'; 
import { Formik } from 'formik';  // Formik library to handle form state and submission
import * as Yup from 'yup'; // Yup library for schema-based validation
import client from '../api/client'; // Axios client for making API requests
import FormContainer from './FormContainer'; // Custom container for form layout
import FormInput from './FormInput'; // Custom component for input fields
import FormSubmitButton from './FormSubmitButton'; // Custom button component for submitting form

// Yup validation schema for user signup
const validationSchema = Yup.object({
  // Validation for full name
  fullName: Yup.string().trim().min(3, 'Invalid name!').required('Name is required!'),
  // Validation for email field
  email: Yup.string().email('Invalid email!').required('Email is required!'),
  // Validation for password field
  password: Yup.string().trim().min(8, 'Password is too short!').required('Password is required!'), // Ensure passwords match
   // Validation for confirm password field
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Password does not match!')
    .required('Confirm password is required!'),
});

// The SignupForm component
const SignupForm = ({ navigation }) => {
   // State to hold error messages
  const [error, setError] = useState('');

   // Function to handle form submission
  const signUp = async (values, formikActions) => {
    try {
       // Sending request to create a new user
      const res = await client.post('/create-user', values);
      if (res.data.success) {
        // If user creation is successful, attempt to sign in the user
        const signInRes = await client.post('/sign-in', {
          email: values.email,
          password: values.password,
        });

        if (signInRes.data.success) {
          // If sign-in is successful, navigate to the Home screen
          navigation.replace('Home');
        }
      }

      // Reset the form values
      formikActions.resetForm();
    } catch (err) {
       // Set error message if the request fails
      setError('There was an issue with the server. Please try again later.');
    } finally {
      // Stop the form submission progress spinner
      formikActions.setSubmitting(false);
    }
  };

  return (
    // Handling keyboard behavior on iOS and Android separately
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null} // No behavior for Android
      style={{ flex: 1 }}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }} // Ensure scroll view grows to take up the space
      >
        <FormContainer>
          <Formik
            initialValues={{ fullName: '', email: '', password: '', confirmPassword: '' }}
            validationSchema={validationSchema}
            onSubmit={signUp}
          >
            {({ values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
              <>
                <FormInput
                  value={values.fullName}
                  error={touched.fullName && errors.fullName}
                  onChangeText={handleChange('fullName')}
                  onBlur={handleBlur('fullName')}
                  label="Full Name"
                  placeholder="John Smith"
                />
                <FormInput
                  value={values.email}
                  error={touched.email && errors.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  autoCapitalize="none"
                  label="Email"
                  placeholder="example@email.com"
                />
                <FormInput
                  value={values.password}
                  error={touched.password && errors.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  autoCapitalize="none"
                  secureTextEntry
                  label="Password"
                  placeholder="********"
                />
                <FormInput
                  value={values.confirmPassword}
                  error={touched.confirmPassword && errors.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  autoCapitalize="none"
                  secureTextEntry
                  label="Confirm Password"
                  placeholder="********"
                />
                <FormSubmitButton submitting={isSubmitting} onPress={handleSubmit} title="Sign up" />
              </>
            )}
          </Formik>
        </FormContainer>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({}); // Optional styles for the component (currently empty)

export default SignupForm; // Export the SignupForm component for use in other parts of the app
