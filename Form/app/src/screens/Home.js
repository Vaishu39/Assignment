import React, { useEffect, useState } from 'react'; // Importing React and hooks
import axios from 'axios'; // Axios for making HTTP requests
import Icon from "react-native-vector-icons/MaterialIcons"; // Material icons for buttons
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Modal, TextInput, ScrollView, Button, Image, Alert } from 'react-native'; // Importing essential UI components from React Native
import * as ImagePicker from 'expo-image-picker'; // Expo image picker for selecting images from the gallery

const API_BASE_URL = "http://192.168.1.3:4000/api/flowers"; // API base URL for fetching flowers
const Home = () => {
  const [list, setList] = useState([]); // State to hold the list of flowers
  const [modalFlower, setModalFlower] = useState(false); // Modal visibility state
  const [flowerName, setFlowerName] = useState(""); // State for flower name
  const [flowerImage, setFlowerImage] = useState(""); // State for flower image
  const [quantity, setQuantity] = useState(""); // State for quantity
  const [color, setColor] = useState(""); // State for color
  const [flowerId, setFlowerId] = useState(null); // State to store the ID of the flower being edited

  // useEffect hook to load flowers on initial render and set a refresh interval
  useEffect(() => {
    getListFlowers(); // Fetch flower list
    const intervalId = setInterval(getListFlowers, 1000); // Refresh every 5 seconds
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  // Fetch list of flowers from the backend
  const getListFlowers = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setList(response.data); // Update list of flowers in state
    } catch (error) {
      console.error("Error fetching flowers:", error);
    }
  };

  // Function to pick an image using the ImagePicker
  const picImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync(); // Request permission

    if (status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true, // Allows image editing
        quality: 1, // Highest quality
      });

      if (!result.canceled) {
        setFlowerImage(result.assets[0].uri); // Update flower image state
      }
    }
  };

  // Handle the removal of a flower
  const handleRemove = async (item) => {
    try {
      await axios.delete(`${API_BASE_URL}/${item._id}`);
      setList((prevList) => prevList.filter((flower) => flower._id !== item._id)); // Remove flower from the list
      Alert.alert("Success", "Flower deleted successfully!"); // Show success alert
    } catch (error) {
      console.error("Error deleting flower:", error);
      Alert.alert("Error", "Failed to delete flower."); // Show error alert
    }
  };

  // Show the modal to add a new flower or edit an existing one
  const handleCreate = () => {
    clearForm();
    setModalFlower(true); // Open modal
  };

  // Close the modal
  const handleCloseModal = () => setModalFlower(false);

  // Save flower (create or update) with form data
  const handleSave = async () => {
    try {
      const url = flowerId ? `${API_BASE_URL}/${flowerId}` : API_BASE_URL; // If flowerId exists, update; otherwise, create new
      const method = flowerId ? "put" : "post"; // Define HTTP method dynamically

      let formData = new FormData(); // Create a new FormData object
      formData.append("name", flowerName); // Append flower name
      formData.append("quantity", quantity); // Append flower quantity
      formData.append("color", color); // Append flower color

      if (flowerImage) {
        let localUri = flowerImage;
        let filename = localUri.split("/").pop(); // Extract filename from the URI
        let match = /\.(\w+)$/.exec(filename); // Get file extension
        let type = match ? `image/${match[1]}` : `image`; // Set the image type

        formData.append("image", {
          uri: localUri,
          name: filename,
          type,
        });
      }

      const response = await axios({
        method,
        url,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Flower saved successfully:", response.data); // Log the response
      getListFlowers(); // Refresh the flower list
      handleCloseModal(); // Close the modal
      Alert.alert("Success", flowerId ? "Flower updated successfully!" : "Flower added successfully!"); // Show success alert
    } catch (error) {
      console.error("Error saving flower:", error.response?.data || error.message); // Log any errors
      Alert.alert("Error", "Failed to save flower."); // Show error alert
    }
  };

  // Clear form data
  const clearForm = () => {
    setFlowerName("");
    setFlowerImage("");
    setQuantity("");
    setColor("");
    setFlowerId(null);
  };

  // Edit flower details (populate the form with current flower details)
  const handleEdit = (item) => {
    setFlowerId(item._id); // Set the flower ID to edit
    setFlowerName(item.name); // Populate the flower name
    setFlowerImage(item.image); // Set the image URL for the specific flower
    setQuantity(item.quantity.toString()); // Convert quantity to string and set
    setColor(item.color); // Set the flower color
    setModalFlower(true); // Open modal
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.subtitle}>BloomHub Flower Shop</Text>
      </View>

      <Modal visible={modalFlower} transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{flowerId ? "Edit Flower" : "New Flower"}</Text>
              <TouchableOpacity onPress={handleCloseModal}>
                <Text style={styles.modalClose}>Close</Text>
              </TouchableOpacity>
            </View>

            <Text>Flower Name</Text>
            <TextInput style={styles.textInput} placeholder="Flower Name" value={flowerName} onChangeText={setFlowerName} />

            <Text>Image</Text>
            <View style={styles.containerimage}>
              <Button title="Pick an Image" onPress={picImage} />
            </View>

            <Text>Quantity</Text>
            <TextInput style={styles.textInput} placeholder="Quantity" value={quantity} onChangeText={setQuantity} keyboardType="numeric" />

            <Text>Color</Text>
            <TextInput style={styles.textInput} placeholder="Color" value={color} onChangeText={setColor} />

            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Flowers List ({list.length})</Text>
        <TouchableOpacity onPress={handleCreate}>
          <Text style={styles.addButton}>NEW</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {list.map((item) => (
          <View style={styles.itemContainer} key={item._id}>
            <View style={styles.item}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
              <Text style={styles.itemText}>Color: {item.color}</Text>

              {item.image && <Image source={{ uri:`http://192.168.1.3:4000${item.image}` }} style={styles.myImage} />}
            </View>
            <TouchableOpacity onPress={() => handleRemove(item)} style={styles.deleteButton}>
              <Icon name="delete" size={24} color="red" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleEdit(item)} style={styles.editButton}>
              <Icon name="edit" size={24} color="green" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

// Styling for various UI components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white'
  },
  header: {
    marginTop: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'green'
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  modalClose: {
    color: 'red',
    fontSize: 16
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#888',
    marginBottom: 10
  },
  saveButton: {
    backgroundColor: 'black',
    padding: 10,
    alignItems: 'center'
  },
  saveText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  addButton: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 15
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 10
  },
  item: {
    flex: 1
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  itemText: {
    fontSize: 14
  },
  deleteButton: {
    marginLeft: 10
  },
  editButton: {
    marginLeft: 10
  },
  containerimage: {
    flexDirection: 'row',
    marginBottom: 10
  },
  myImage: {
    width: 100,
    height: 100,
    justifyContent: 'center',
  }
});

export default Home; // Exporting the Home component
