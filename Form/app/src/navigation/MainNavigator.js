import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'; // Import stack navigator from React Navigation
import AppForm from '../../component/AppForm'; // Import the AppForm component
import { useLogin } from '../../context/LoginProvider'; // Import the useLogin hook from LoginProvider
import DrawerNavigator from "./DrawerNavigator";  // Import the DrawerNavigator component


const Stack = createStackNavigator(); // Create an instance of Stack Navigator


const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={AppForm} name='AppForm' />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  const { isLoggedIn } = useLogin(); // Retrieve isLoggedIn state from context
  return isLoggedIn ? <DrawerNavigator /> : <StackNavigator />; // Show DrawerNavigator if logged in, else show StackNavigator
};
export default MainNavigator; // Export MainNavigator as the default component