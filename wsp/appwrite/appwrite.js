import { Client } from 'react-native-appwrite';
import { Account, ID, Avatars, Databases } from 'react-native-appwrite';
import { router } from 'expo-router';

const config = {
    endpoint:"https://cloud.appwrite.io/v1",
    platform:"com.mindsinmotion.safeher",
    projectId:"66e7dd240000f5dfed45",
    databaseId:"66e7f6620037e025b098",
    userCollectionId:"66e7f6830001083e22f2",
    numberCollectionId:"66e7f6bf0034f6fdf023"

}


// Initialize Appwrite Client
const client = new Client();
client
    .setEndpoint(config.endpoint) // Your Appwrite API Endpoint
    .setProject(config.projectId); // Your Project ID

const account = new Account(client);
const databases = new Databases(client);
const avatars = new Avatars(client);

// Config object holding your Appwrite IDs
const appwriteConfig = {
    databaseId: config.databaseId,
    userCollectionId: config.userCollectionId,
};

// Function to register a new user

export async function createUser(email, password, username, phone) {
    try {
        // Create the account
        const newAccount = await account.create(
            ID.unique(), // Create a unique ID for the account
            email,
            password,
            username,
            phone
        );

        if (!newAccount) throw new Error("Failed to create a new account.");

        // Generate the avatar URL from the username
        const avatarUrl = avatars.getInitials(username);

        // Sign in the user after account creation
        await signIn(email, password); // Assuming `signIn` is another function that handles user login

        // Store user information in the database, including mobile number
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                username: username,
                avatar: avatarUrl.href,  // Storing the correct avatar URL
                phone: phone, // Correctly adding phone number to the user document
            }
        );

        return newUser; // Return the new user document created
    } catch (error) {
        throw new Error(error.message || "An error occurred while creating the user.");
    }
}


// SignIn function (this should already exist in your code)
export async function signIn(email, password) {
    try {
      const session = await account.createEmailPasswordSession(email, password);
      return session;
    } catch (error) {
      throw new Error(error.message || "Failed to sign in.");
    }
  }



  export async function logout() {
      try {
          await account.deleteSession('current'); // Logs out the current session
          console.log("User logged out successfully.");
          return true;
      } catch (error) {
          console.error("Logout failed: ", error.message);
          return false;
      }
  }
  

  export async function storeEmergencyNumbers(userId, contactNumbers) {
    // Validate that all fields in the object are filled
    if (Object.values(contactNumbers).some(number => !number)) {
        throw new Error("All 5 contact numbers are required.");
    }

    try {
        // Create a document in the number collection with the userId and contact numbers
        const newContactNumbers = await databases.createDocument(
            config.databaseId, // Database ID
            config.numberCollectionId, // Collection ID
            ID.unique(), // Unique ID for the document
            {
                contact1: contactNumbers.contactOne,
                contact2: contactNumbers.contactTwo,
                contact3: contactNumbers.contactThree,
                contact4: contactNumbers.contactFour,
                contact5: contactNumbers.contactFive,
                userId: userId,  // Pass the userId manually
            }
        );

        return newContactNumbers; // Return the newly created document
    } catch (error) {
        throw new Error(error.message || "An error occurred while storing contact numbers.");
    }
}




//function to check the current session 
export async function checkSession()  {
    try {
      // Check if the session exists
      const session = await account.get(); 
      if (session) {
        // If session exists, navigate to the home screen
        router.push('/home');
      }
    } catch (error) {
      console.error("No active session: ", error.message);
      // Optionally navigate to the login screen
     
    }
  };


  export async function getCurrentAccount() {
    try {
      // Get current account information
      const user = await account.get(); // This fetches the current user information
      return user; // Returns user details
    } catch (error) {
      console.error("Failed to get current account:", error.message);
      throw new Error("Failed to get account details.");
    }
  }