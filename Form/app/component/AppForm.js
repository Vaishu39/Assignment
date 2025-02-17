import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, ScrollView, Animated, Dimensions } from 'react-native';
import FormHeader from './FormHeader';
import FormSelectorBtn from './FormSelectorBtn';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import axios from 'axios';

const { width } = Dimensions.get('window'); // Get the device screen width

export default function AppForm({ navigation }) {
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
  }, []);

  // Interpolations for animations
  const rightHeaderOpacity = animation.interpolate({
    inputRange: [0, width],
    outputRange: [1, 0], // Fade out when scrolling
  });
  const leftHeaderTranslateX = animation.interpolate({
    inputRange: [0, width],
    outputRange: [0, 40], // Move left when scrolling
  });
  const rightHeaderTranslateY = animation.interpolate({
    inputRange: [0, width],
    outputRange: [0, -20], // Move up when scrolling
  });
  const loginColorInterpolate = animation.interpolate({
    inputRange: [0, width],
    outputRange: ['rgba(27,27,51,1)', 'rgba(27,27,51,0.4)'], // Dark to light for login button
  });
  const signupColorInterpolate = animation.interpolate({
    inputRange: [0, width],
    outputRange: ['rgba(27,27,51,0.4)', 'rgba(27,27,51,1)'], // Light to dark for signup button
  });

  return (
    <View style={styles.container}>
      <View style={styles.subview}>
        <FormHeader
          leftheading='Welcome '
          rightheading='Back'
          subheading='BloomHub FlowerShop'
          rightHeaderOpacity={rightHeaderOpacity}
          leftHeaderTranslateX={leftHeaderTranslateX}
          rightHeaderTranslateY={rightHeaderTranslateY}
        />
      </View>
      <View style={styles.main}>
        <FormSelectorBtn
          style={styles.borderLeft}
          backgroundColor={loginColorInterpolate}
          title='Login'
          onPress={() => {
            console.log('Login button pressed');
            scrollViewRef.current.scrollTo({ x: 0 });
          }}
           // Scroll to login form
        />
        <FormSelectorBtn
          style={styles.borderRight}
          backgroundColor={signupColorInterpolate}
          title='Sign Up'
          onPress={() => scrollViewRef.current.scrollTo({ x: 0 })} // Scroll to signup form
        />
      </View>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: animation } } }],
          { useNativeDriver: false }
        )}
      >
        <LoginForm navigation={navigation} />
        <View>
          <SignupForm navigation={navigation} />
        </View>
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
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  borderLeft: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  borderRight: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
});