import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AppForm from '../../component/AppForm';
import { useLogin } from '../../context/LoginProvider';
import DrawerNavigator from "./DrawerNavigator";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={AppForm} name='AppForm' />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  const { isLoggedIn } = useLogin();
  return isLoggedIn ? <DrawerNavigator /> : <StackNavigator />;
};
export default MainNavigator;