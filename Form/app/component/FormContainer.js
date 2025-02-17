import React from "react";
import { KeyboardAvoidingView, StyleSheet, Dimensions } from 'react-native';

// Functional component that wraps its children inside a KeyboardAvoidingView
const FormContainer = ({ children }) => {
    return (
        <KeyboardAvoidingView style={styles.container}>{children}</KeyboardAvoidingView> 
    );
}

// Styles for the container
const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        paddingHorizontal:20
    },
})

export default FormContainer; // Exports the component for use in other parts of the app