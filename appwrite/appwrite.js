import { Account, Databases, Client } from "react-native-appwrite";

const client = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID)
    .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM_NAME)

export const account = new Account(client);
export const databases = new Databases(client);

export const databaseId = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID
export const typeOfUserCollectionId = process.env.EXPO_PUBLIC_APPWRITE_TYPE_OF_USER_COLLECTION_ID