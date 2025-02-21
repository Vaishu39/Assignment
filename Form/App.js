import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer to manage navigation state
import MainNavigator from './app/src/navigation/MainNavigator'; // Import MainNavigator for app navigation
import LoginProvider from './app/context/LoginProvider'; // Import LoginProvider to manage authentication state


export default function App() {
  return (
    // Wrapping the entire application with LoginProvider to provide login state across all components
    <LoginProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </LoginProvider>
  );
}