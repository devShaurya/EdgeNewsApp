import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import { VideoScreen } from "./screens/VideoScreen";

const Stack = createNativeStackNavigator();

function App() {
    const [masterVideoList, setMasterVideoList] = useState([]);
    const [favoriteVideoList, setFavoriteVideoList] = useState([]);
    const [watchLaterVideoList, setWatchLaterVideoList] = useState([]);

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
                <Stack.Screen name="videoList">
                    {(props) => (
                        <HomeScreen
                            {...props}
                            masterVideoList={masterVideoList}
                            setMasterVideoList={setMasterVideoList}
                            favoriteVideoList={favoriteVideoList}
                            watchLaterVideoList={watchLaterVideoList}
                        />
                    )}
                </Stack.Screen>
                <Stack.Screen name="video">
                    {(props) => (
                        <VideoScreen
                            {...props}
                            setFavoriteVideoList={setFavoriteVideoList}
                            setWatchLaterVideoList={setWatchLaterVideoList}
                            favoriteVideoList={favoriteVideoList}
                            watchLaterVideoList={watchLaterVideoList}
                        />
                    )}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
