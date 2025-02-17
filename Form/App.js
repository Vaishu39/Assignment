import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './app/src/navigation/MainNavigator';
import LoginProvider from './app/context/LoginProvider';


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