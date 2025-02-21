// Function to check if all fields in an object are non-empty after trimming spaces
export const isValidObjField = (obj) => {
    return Object.values(obj).every((field) => field.trim()); // Returns true if all fields contain valid non-empty values
}
// Function to update error state and automatically clear it after 2.5 seconds
export const updateError = (error, stateUpdater) => {
    stateUpdater(error); // Set the error message in state
    setTimeout(() => {
        stateUpdater('') // Clear the error message after timeout
    }, 2500)
}

// Function to validate if an input is a properly formatted email address
export const isValidEmail = (value) => {
    const regEx = /\S+@\S+\.\S+/; // Regular expression for email validation
    return regEx.test(value); // Returns true if the value matches the email format
}
