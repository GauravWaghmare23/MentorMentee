import { Tabs } from "expo-router";

export default function TeacherLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="TeacherHome" options={{ headerShown: false }} />
            <Tabs.Screen name="TeacherProfile" options={{ headerShown: false }} />
        </Tabs>
    )
}
