import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import CustomDrawer from '../components/CustomDrawer';

const Drawer = createDrawerNavigator(); //Creates an instance of the Drawer Navigator.

const DrawerNavigator = () => {
  return (
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          headerShown: true, //Displays the top header.
          headerStyle: { backgroundColor: '#ffc0cb', elevation: 0, shadowOpacity: 0 },
          headerTitleAlign: 'center',
          headerTintColor: 'black',
          headerTitleStyle: { fontSize: 20, fontWeight: 'bold' },
        }}>
        <Drawer.Screen name="Home" component={Home} />
      </Drawer.Navigator>
  );
};

export default DrawerNavigator;
