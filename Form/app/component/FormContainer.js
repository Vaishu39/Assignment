import React from "react";
import { KeyboardAvoidingView, StyleSheet, Dimensions } from 'react-native';

// Functional component that wraps its children inside a KeyboardAvoidingView
const FormContainer = ({ children }) => {
    return (
        <KeyboardAvoidingView style={styles.container}> 
            {children} 
            </KeyboardAvoidingView> 
    );
}

// Styles for the container
const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width, // Sets the width to the device's screen width
        paddingHorizontal:20, // Adds horizontal padding for spacing
    },
})

export default FormContainer; // Exports the component for use in other parts of the app