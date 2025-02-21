import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const FormSubmitButton = ({ title, submitting, onPress }) => {
   // Background color changes based on the submitting state
  const backgroundColor = submitting
    ? 'rgba(27,27,51,0.4)' // Dimmed color when submitting (disabled state)
    : 'rgba(27,27,51,1)'; // Normal color when active

  return (
     // TouchableOpacity provides a button-like interaction
    <TouchableOpacity
      onPress={!submitting ? onPress : null} // Disable button when submitting
      style={[styles.container, { backgroundColor }]} // Apply styles dynamically
    >
      {/* Button text */}
      <Text style={{ fontSize: 18, color: '#fff' }}>{String(title)}</Text>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 45,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// Export the component for use in other parts of the app
export default FormSubmitButton;