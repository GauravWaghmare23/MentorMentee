import { Tabs } from "expo-router"

export default function StudentLayout(){
    return (
        <Tabs>
            <Tabs.Screen name="StudentHome" options={{ headerShown: false }} />
            <Tabs.Screen name="StudentProfile" options={{ headerShown: false }} />
        </Tabs>
    )
}

