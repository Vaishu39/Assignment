import React from "react";
import { Text, View, StyleSheet, Animated } from 'react-native';

// Functional component that displays the header of the form
const FormHeader = ({ 
    leftheading, // Left part of the heading text
    rightheading, // Right part of the heading text
    subheading , // Subheading text

    // Default animation values for header transitions
    leftHeaderTranslateX=40, // Moves left heading along X-axis
    rightHeaderTranslateY=-20, // Moves right heading along Y-axis
    rightHeaderOpacity=0, // Sets opacity for right heading
}) => {
    return (
        <>
        
            <View style={styles.container}>
               
                <Animated.Text style={[styles.heading, { transform: [{ translateX: leftHeaderTranslateX }] }]}>{leftheading}</Animated.Text> 

                
                <Animated.Text style={[styles.heading, { opacity: rightHeaderOpacity, transform: [{ translateY: rightHeaderTranslateY }] }]}>{rightheading}</Animated.Text>
            </View>
             
            <Text style={styles.subheading}>{subheading}</Text>
        </>
    );
}

// Styles for the component
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#1b1b33',
    },
    subheading: {
        fontsize: 18,
        color: '#1b1b33',
        textAlign: 'center'
    }
})
// Export the component for use in other parts of the app
export default FormHeader;