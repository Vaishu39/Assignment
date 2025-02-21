import { useEffect, useState } from 'react'; // Importing hooks from React
import { Button, InputGroup, Toaster } from '@blueprintjs/core'; // Importing UI components from BlueprintJS
import './App.css'; // Importing custom CSS

const AppToaster = Toaster.create({ position: "top" }); // Creating a toaster for displaying messages

function App() {
    const [flowers, setFlowers] = useState([]); // State to store the list of flowers
    const [editingFlowerId, setEditingFlowerId] = useState(null); // State to track which flower is being edited
    const [editedData, setEditedData] = useState({ name: "", quantity: "", color: "", newImage: null }); // State to store edited data for a flower

    useEffect(() => {
        fetchFlowers(); // Initial call to fetch flowers when component mounts
        const intervalId = setInterval(fetchFlowers, 1000); // Refresh every second
        return () => clearInterval(intervalId); // Cleanup the interval on unmount
    }, []); // Empty dependency array means this effect runs once when the component mounts

    function fetchFlowers() {
        fetch('http://192.168.1.3:4000/api/flowers') // Fetch flowers data from the API
            .then(response => response.json()) // Parse the response to JSON
            .then(json => setFlowers(json)) // Update the state with the fetched data
            .catch(error => console.error("Error fetching flowers:", error)); // Log errors if any
    }

    function addFlower() {
        if (!editedData.name || !editedData.quantity || !editedData.color || !editedData.newImage) {
            AppToaster.show({ message: "Please fill all fields", intent: 'warning' }); // Show warning if any field is missing
            return; // Prevent form submission if fields are missing
        }

        const formData = new FormData(); // Create a new form data object for the POST request
        formData.append("name", editedData.name.trim()); // Append name field
        formData.append("quantity", editedData.quantity.trim()); // Append quantity field
        formData.append("color", editedData.color.trim()); // Append color field
        formData.append("image", editedData.newImage); // Append image field

        fetch("http://192.168.1.3:4000/api/flowers", {
            method: "POST", // POST request to add a new flower
            body: formData // Send form data
        })
            .then(response => response.json()) // Parse the response as JSON
            .then(data => {
                setFlowers([...flowers, data]); // Add the new flower to the state
                AppToaster.show({ message: "Flower added successfully", intent: 'success' }); // Show success message
                clearEditData(); // Clear the edit form
            })
            .catch(error => console.error("Error adding flower:", error)); // Handle any errors during the POST request
    }

    function startEdit(flowerId, flower) {
        if (editingFlowerId !== null && editingFlowerId !== flowerId) {
            AppToaster.show({ message: "Finish editing the current flower first", intent: "warning" }); // Show warning if another flower is being edited
            return;
        }
        setEditingFlowerId(flowerId); // Set the ID of the flower being edited
        setEditedData({
            name: flower.name,  // Populate the form with the current flower's data
            quantity: flower.quantity,
            color: flower.color,
            newImage: null
        });
    }

    function saveEdit(id) {
        const formData = new FormData(); // Create form data for PUT request
        formData.append("name", editedData.name); // Append the edited fields
        formData.append("quantity", editedData.quantity);
        formData.append("color", editedData.color);
        if (editedData.newImage) formData.append("image", editedData.newImage); // Append image if selected

        fetch(`http://192.168.1.3:4000/api/flowers/${id}`, {
            method: "PUT", // PUT request to update the flower data
            body: formData // Send the updated form data
        })
            .then(response => response.json()) // Parse the response as JSON
            .then(updatedFlower => {
                setFlowers(flowers.map(f => f._id === id ? updatedFlower : f)); // Update the flower in the state
                AppToaster.show({ message: "Flower updated successfully", intent: 'primary' });  // Show success message
                clearEditData(); // Clear the edit form
            })
            .catch(error => console.error("Error updating flower:", error));  // Handle errors
    }

    function deleteFlower(id) {
        fetch(`http://192.168.1.3:4000/api/flowers/${id}`, { method: "DELETE" }) // DELETE request to remove the flower
            .then(response => response.json())  // Parse the response as JSON
            .then(() => {
                setFlowers(flowers.filter(f => f._id !== id)); // Remove the flower from the state
                AppToaster.show({ message: "Flower deleted successfully", intent: 'danger' }); // Show success message
            })
            .catch(error => console.error("Error deleting flower:", error)); // Handle errors
    }

    function clearEditData() {
        setEditingFlowerId(null); // Clear the flower being edited
        setEditedData({ name: "", quantity: "", color: "", newImage: null });  // Clear the form data
    }

    return (
        <div className="App">
            <h2>Welcome To</h2>
            <h1 style={{ color: 'green' }}>BloomHub Flower Shop</h1>
            <h2>Flowers List ({flowers.length})</h2>
            <Button intent="success" onClick={addFlower} className="move-top-right">New</Button>

            <table className='bp4-html-table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Color</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {flowers.map(flower => ( // Iterate over the flowers and render them in rows
                        <tr key={flower._id}>
                            {editingFlowerId === flower._id ? ( // Check if this flower is being edited
                                <>
                                    <td><InputGroup value={editedData.name} onChange={e => setEditedData({ ...editedData, name: e.target.value })} /></td>
                                    <td><InputGroup value={editedData.quantity} onChange={e => setEditedData({ ...editedData, quantity: e.target.value })} /></td>
                                    <td><InputGroup value={editedData.color} onChange={e => setEditedData({ ...editedData, color: e.target.value })} /></td>
                                    <td>
                                        <input type="file" accept="image/*" onChange={e => setEditedData({ ...editedData, newImage: e.target.files[0] })} />
                                    </td>
                                    <td>
                                        <Button intent="success" icon="floppy-disk" onClick={() => saveEdit(flower._id)}>Save</Button>
                                        &nbsp;
                                        <Button icon="cross" intent="warning" onClick={clearEditData} />
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{flower.name}</td>
                                    <td>{flower.quantity}</td>
                                    <td>{flower.color}</td>
                                    <td>
                                        <img src={flower.image && flower.image.startsWith("http") ? flower.image : `http://192.168.1.3:4000${flower.image}`}
                                            alt={flower.name} style={{ width: "50px", height: "50px" }} />
                                    </td>
                                    <td>
                                        <Button icon="trash" intent="danger" onClick={() => deleteFlower(flower._id)} />
                                        &nbsp;
                                        <Button
                                            icon="edit"
                                            intent="primary"
                                            onClick={() => startEdit(flower._id, flower)} // Button to start editing
                                            disabled={editingFlowerId !== null && editingFlowerId !== flower._id} // Disable edit if another flower is being edited
                                        />
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    {editingFlowerId === null && (  // Only show the form to add a new flower if no flower is being edited
                        <tr>
                            <td><InputGroup value={editedData.name} onChange={(e) => setEditedData({ ...editedData, name: e.target.value })} placeholder='Enter Name' /></td>
                            <td><InputGroup value={editedData.quantity} onChange={(e) => setEditedData({ ...editedData, quantity: e.target.value })} placeholder='Enter Quantity' /></td>
                            <td><InputGroup value={editedData.color} onChange={(e) => setEditedData({ ...editedData, color: e.target.value })} placeholder='Enter Color' /></td>
                            <td><input type="file" accept="image/*" onChange={e => setEditedData({ ...editedData, newImage: e.target.files[0] })} /></td>
                            <td></td>
                        </tr>
                    )}
                </tfoot>
            </table>
        </div>
    );
}

export default App; // Exporting the App component
