import React, { useEffect, useState } from "react";
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

export default function HomeScreen({
    masterVideoList,
    setMasterVideoList,
    favoriteVideoList,
    watchLaterVideoList,
}) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
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
                            name: partner_content_url
                                .substring(
                                    partner_content_url.lastIndexOf("/") + 1,
                                    partner_content_url.length - 4
                                )
                                .split("-")
                                .join(" "),
                        },
                    ];
                });
                if (aborted == false) {
                    setMasterVideoList(tempVideoList);
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
                    } else if (route.name === "Favorites") {
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
                        masterVideoList={masterVideoList}
                        // inFavoriteTab={false}
                        // inWatchLaterTab={false}
                    />
                )}
            </Tab.Screen>
            <Tab.Screen name="Favorites">
                {(props) => (
                    <VideoList
                        isLoading={isLoading}
                        {...props}
                        masterVideoList={masterVideoList.filter((value) => {
                            return favoriteVideoList.includes(value.name);
                        })}
                        // favoriteVideoList={favoriteVideoList}
                        // inFavoriteTab={true}
                    />
                )}
            </Tab.Screen>
            <Tab.Screen name="Watch Later">
                {(props) => (
                    <VideoList
                        isLoading={isLoading}
                        {...props}
                        masterVideoList={masterVideoList.filter((value) => {
                            return watchLaterVideoList.includes(value.name);
                        })}
                        // watchLaterVideoList={watchLaterVideoList}
                        // inWatchLaterTab={true}
                    />
                )}
            </Tab.Screen>
        </Tab.Navigator>
    );
}
