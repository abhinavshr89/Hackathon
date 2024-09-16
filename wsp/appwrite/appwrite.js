
import { Client, Account, Databases, ID, Avatars } from 'appwrite';
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
export async function createUser(email, password, username, mobileNumber) {
    try {
        // Create the account
        const newAccount = await account.create(
            ID.unique(), // Create a unique ID for the account
            email,
            password,
            username
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
                mobileNumber: mobileNumber, // Adding mobile number to the user document
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