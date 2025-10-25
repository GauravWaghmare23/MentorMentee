import { AuthProvider } from "@/context/AuthContext";
import { Slot } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function RootLayout() {
  return (
    <AuthProvider>
      <GestureHandlerRootView>
        <Slot />
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
