import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer'; // Import drawer navigator from React Navigation
import Home from '../screens/Home'; // Import the Home screen component
import CustomDrawer from '../components/CustomDrawer'; // Import the custom drawer component

const Drawer = createDrawerNavigator(); //Creates an instance of the Drawer Navigator.

const DrawerNavigator = () => {
  return (
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawer {...props} />} // Use CustomDrawer for navigation drawer content
        screenOptions={{
          headerShown: true, //Displays the top header.
          headerStyle: { backgroundColor: '#ffc0cb', elevation: 0, shadowOpacity: 0 }, // Style the header background
          headerTitleAlign: 'center',
          headerTintColor: 'black',
          headerTitleStyle: { fontSize: 20, fontWeight: 'bold' },
        }}>
        <Drawer.Screen name="Home" component={Home} />
      </Drawer.Navigator>
  );
};

export default DrawerNavigator; // Export the drawer navigator component
