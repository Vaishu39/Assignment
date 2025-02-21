import React from "react";
import { StyleSheet, Text, TextInput, View } from 'react-native';

// Functional component for rendering an input field with a label
const FormInput = (props) => {
    const { placeholder, label, error } = props; // Destructure props to include 'error'

    return (
        <>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 5,
                }}
            >
                <Text style={{ fontWeight: 'bold' }}>{label}</Text>
                {error && typeof error === 'string' ? (
  <Text style={{ color: 'red', fontSize: 16 }}>{error}</Text>
) : null}

            </View>
            <TextInput {...props} placeholder={placeholder} style={styles.input} />
        </>
    );
};

// Styles for the input field
const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#1b1b33',
        height: 45,
        borderRadius: 8,
        fontSize: 16,
        paddingLeft: 10,
        marginBottom: 20
    }
});

export default FormInput;