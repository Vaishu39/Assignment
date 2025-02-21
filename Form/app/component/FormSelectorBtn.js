import React from "react";
import {  StyleSheet, TouchableWithoutFeedback, Text,Animated } from 'react-native';

// Functional component for rendering a button with animation
const FormSelectorBtn = ({ title, backgroundColor, style ,onPress}) => {
    return (
        // TouchableWithoutFeedback is used to make the button interactive without showing feedback
        <TouchableWithoutFeedback onPress={onPress}>
            
            <Animated.View style={[styles.container, style, { backgroundColor }]}>
                 
                <Text style={styles.title}>{title}</Text>
            </Animated.View>
        </TouchableWithoutFeedback>
    )
}

// Styles for the button container and title
const styles = StyleSheet.create({
    container: {
        height: 45,
        width: '50%',
        backgroundColor: '#1b1b33',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontSize: 16,
    },

})

// Export the component for use in other parts of the app
export default FormSelectorBtn;