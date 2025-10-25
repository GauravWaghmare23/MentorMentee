import { Tabs } from "expo-router"

export default function StudentLayout(){
    return (
        <Tabs>
            <Tabs.Screen name="StudentHome" options={{ headerShown: false }} />
            <Tabs.Screen name="StudentPostAdd" options={{ headerShown: false }} />
            <Tabs.Screen name="StudentSearch" options={{ headerShown: false }} />
            <Tabs.Screen name="StudentChats" options={{ headerShown: false }} />
            <Tabs.Screen
                name="StudentProfile"
                options={{
                    href:null
                }}
            />
        </Tabs>
    )
}

