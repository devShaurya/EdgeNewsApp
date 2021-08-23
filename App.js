import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import { VideoScreen } from "./screens/VideoScreen";

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={"videoList"}
                screenOptions={{
                    title: "EdgeNews App",
                    headerStyle: {
                        backgroundColor: "#53bb53",
                    },
                    headerTintColor: "#000",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                }}
            >
                <Stack.Screen name="videoList" component={HomeScreen} />
                <Stack.Screen name="video" component={VideoScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
