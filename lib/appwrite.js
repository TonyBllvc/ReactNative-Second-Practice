
import { Account, Avatars, Client, Databases, ID } from 'react-native-appwrite';

// details id sent to you from appwrite
export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.jsm.auro",
    projectId: "6738860b00262f5c0777",
    databaseId: "67388a180006e0bbdf00",
    userCollectionId: "67388aa7002cc5cbf05e",
    videoCollectionId: "67388ae200269ff745b7",
    storageId: "67388d0f003cddcc55e9"
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.
    ;

    // reference to the active sessions on appwrite 
const account = new Account(client);
const avatars = new Avatars(client)
const databases = new Databases(client)

export const createUser = async (email, password, username) => {
    // Register User
    try {
        const newAccount = await account.create(
            ID.unique(),
            email, 
            password,
            username
        )

        if (!newAccount) throw Error
        
        const avatarUrl = avatars.getInitials(username)

        // await signIn(email, password)

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )

        return newUser;
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }

}

export async function signIn(email, password) {
    try {
        const session = await account.createEmailPasswordSession(email, password)

        return session
    } catch (error) {
        throw new Error(error)
    }
}
