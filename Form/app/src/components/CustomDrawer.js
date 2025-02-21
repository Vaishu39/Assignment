import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'; // Import required UI components from React Native
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'; // Import navigation drawer components
import { useLogin } from '../../context/LoginProvider'; // Import login context for authentication state

const CustomDrawer = (props) => { //Uses DrawerContentScrollView to enable scrolling in the drawer. props are passed down to maintain navigation functionality.
  const { setIsLoggedIn } = useLogin(); // Access login state to handle logout function
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerHeader}>
          <View>
            <Text style={styles.userName}>Vaishnavi</Text>
            <Text style={styles.userEmail}>BloomHub@gmail.com</Text>
          </View>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1572454591674-2739f30d8c40?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zmxvd2VyJTIwYm91cXVldHxlbnwwfHwwfHx8MA%3D%3D'
            }}
            style={styles.profileImage}
          />
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity style={styles.logOutButton}
       onPress={() => setIsLoggedIn(false)}
      >
       
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerHeader: 
  { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 20, 
    backgroundColor: '#c0c0c0', 
    marginBottom: 20 
  },
  userName: 
  { 
    fontWeight: 'bold' 
  },
  userEmail: 
  { color: 'gray' 

  },
  profileImage: 
  { 
    width: 60, 
    height: 60, 
    borderRadius: 30 
  },
  logOutButton: 
  { position: 'absolute', 
    right: 0, 
    left: 0, 
    bottom: 50, 
    backgroundColor: '#f6f6f6', 
    padding: 20, 
    alignItems: 'center' },
});

export default CustomDrawer;  // Export CustomDrawer component for use in navigation
