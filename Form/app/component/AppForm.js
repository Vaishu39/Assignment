import React, { useEffect, useRef } from 'react'; // Importing necessary React modules
import { StyleSheet, View, ScrollView, Animated, Dimensions } from 'react-native'; // Importing React Native components
import FormHeader from './FormHeader'; // Importing the FormHeader component
import FormSelectorBtn from './FormSelectorBtn'; // Importing the FormSelectorBtn component
import LoginForm from './LoginForm'; // Importing the LoginForm component
import SignupForm from './SignupForm'; // Importing the SignupForm component
import axios from 'axios'; // Importing axios for API calls

const { width } = Dimensions.get('window'); // Get the device screen width

export default function AppForm({ navigation }) { // Main functional component AppForm with navigation prop
  const animation = useRef(new Animated.Value(0)).current; // Create an animated value for transitions
  const scrollViewRef = useRef(); // Reference to the ScrollView for programmatic scrolling

  // Function to fetch data from API
  const fetchApi = async () => {
    try {
      const res = await axios.get('http://192.168.1.3:8000/'); // Make GET request to API
      console.log(res.data); // Log response data
    } catch (error) {
      console.log(error.message); // Log error message
    }
  };

  useEffect(() => {
    fetchApi(); // Fetch API data when component mounts
  }, []); // Empty dependency array ensures this runs only once

  // Interpolations for animations
  const rightHeaderOpacity = animation.interpolate({
    inputRange: [0, width], // Input animation range
    outputRange: [1, 0], // Fade out when scrolling
  });
  const leftHeaderTranslateX = animation.interpolate({
    inputRange: [0, width], // Input animation range
    outputRange: [0, 40], // Move left when scrolling
  });
  const rightHeaderTranslateY = animation.interpolate({
    inputRange: [0, width], // Input animation range
    outputRange: [0, -20], // Move up when scrolling
  });
  const loginColorInterpolate = animation.interpolate({
    inputRange: [0, width], // Input animation range
    outputRange: ['rgba(27,27,51,1)', 'rgba(27,27,51,0.4)'], // Dark to light for login button
  });
  const signupColorInterpolate = animation.interpolate({
    inputRange: [0, width], // Input animation range
    outputRange: ['rgba(27,27,51,0.4)', 'rgba(27,27,51,1)'], // Light to dark for signup button
  });

  return (
    <View style={styles.container}> 
      <View style={styles.subview}> 
        <FormHeader
          leftheading='Welcome ' // Left header text
          rightheading='Back' // Right header text
          subheading='BloomHub FlowerShop' // Subheading text
          rightHeaderOpacity={rightHeaderOpacity} // Pass animated opacity to header
          leftHeaderTranslateX={leftHeaderTranslateX} // Pass animated translation to header
          rightHeaderTranslateY={rightHeaderTranslateY} // Pass animated Y-axis translation to header
        />
      </View>
      <View style={styles.main}> 
        <FormSelectorBtn
          style={styles.borderLeft} // Apply left border styling
          backgroundColor={loginColorInterpolate} // Apply dynamic background color
          title='Login' // Button text
          onPress={() => {
            console.log('Login button pressed'); // Log button press
            scrollViewRef.current.scrollTo({ x: 0, animated: true }); // Scroll to login form
          }}
        />
        <FormSelectorBtn
          style={styles.borderRight} // Apply right border styling
          backgroundColor={signupColorInterpolate} // Apply dynamic background color
          title='Sign Up' // Button text
          onPress={() => {
            console.log('Sign Up button pressed'); // Log button press
            scrollViewRef.current.scrollTo({ x: width, animated: true }); // Scroll to Sign Up form
          }}
        />
      </View>
      <ScrollView
        ref={scrollViewRef} // Assign ScrollView reference
        horizontal // Enable horizontal scrolling
        pagingEnabled // Snap to page while scrolling
        showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
        scrollEventThrottle={16} // Control scroll event updates
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: animation } } }], // Bind scroll position to animation
          { useNativeDriver: false } // Disable native driver for animated event
        )}
      >
        <LoginForm navigation={navigation} />  
        <SignupForm navigation={navigation} /> 
      </ScrollView>
    </View>
  );
}

// Styles for UI elements
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
  subview: {
    height: 80,
  },
  main: {
    flexDirection: 'row',  // Arrange buttons in a row
    paddingHorizontal: 20, // Add horizontal padding
    marginBottom: 20, // Add margin at bottom
  },
  borderLeft: {
    borderTopLeftRadius: 8, // Round top-left corner
    borderBottomLeftRadius: 8, // Round bottom-left corner
  },
  borderRight: {
    borderTopRightRadius: 8, // Round top-right corner
    borderBottomRightRadius: 8, // Round bottom-right corner
  },
});
