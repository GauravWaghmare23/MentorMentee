import { Tabs } from "expo-router";

export default function CollegeLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="CollegeHome" options={{ headerShown: false }} />
            <Tabs.Screen name="CollegeProfile" options={{ headerShown: false }} />
        </Tabs>
    )
}