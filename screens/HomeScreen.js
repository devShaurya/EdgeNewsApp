import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import VideoList from "../components/VideoList";
import { MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const partnerName = "6117722de7669c00079dea91";
const ApiKey = "9PY5VRN-QR84WSC-M4K7ERF-R5M5FVA";
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Access-Control-Allow-Origin", "*");
myHeaders.append("api_key", ApiKey);

const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
};

export default function HomeScreen() {
    const [index, setIndex] = useState(0);
    const [masterVideoList, setMasterVideoList] = useState([]);
    const [filteredVideoList, setFilterdVideoList] = useState([]);
    const [favoriteVideoList, setFavoriteVideoList] = useState([]);
    const [watchLaterVideoList, setWatchLaterVideoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useState(() => {
        let abortController = new AbortController();
        let aborted = abortController.signal.aborted;
        async function fetchData() {
            try {
                aborted = abortController.signal.aborted;
                const response = await fetch(
                    `https://developerapis.stg-alefedge.com/et/api/v1/stream-tech/content/get-all?partner_name=${partnerName}`,
                    requestOptions
                ).then((response) => response.json());
                var tempVideoList = [];
                response.map(({ content_url, partner_content_url } = val) => {
                    tempVideoList = [
                        ...tempVideoList,
                        {
                            content_url,
                            partner_content_url,
                            isInFavorite: false,
                            isInWatchLater: false,
                            name: "Video",
                        },
                    ];
                });
                if (aborted == false) {
                    setMasterVideoList(tempVideoList);
                    setFilterdVideoList(tempVideoList);
                    setIsLoading(false);
                }
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        }
        fetchData();
        return () => {
            abortController.abort();
        };
    }, []);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "Home") {
                        iconName = "home-filled";
                    } else if (route.name === "Favorite") {
                        iconName = "favorite";
                    } else if (route.name === "Watch Later") {
                        iconName = "watch-later";
                    }
                    return (
                        <MaterialIcons
                            name={iconName}
                            size={size}
                            color={color}
                        />
                    );
                },
                tabBarActiveTintColor: "#53bb53",
                tabBarInactiveTintColor: "gray",
            })}
            initialRouteName={"Home"}
        >
            <Tab.Screen name="Home">
                {(props) => (
                    <VideoList
                        isLoading={isLoading}
                        {...props}
                        filteredVideoList={filteredVideoList}
                    />
                )}
            </Tab.Screen>
            <Tab.Screen name="Favorite">
                {(props) => (
                    <VideoList
                        isLoading={isLoading}
                        {...props}
                        filteredVideoList={filteredVideoList}
                    />
                )}
            </Tab.Screen>
            <Tab.Screen name="Watch Later">
                {(props) => (
                    <VideoList
                        isLoading={isLoading}
                        {...props}
                        filteredVideoList={filteredVideoList}
                    />
                )}
            </Tab.Screen>
        </Tab.Navigator>
    );
}
