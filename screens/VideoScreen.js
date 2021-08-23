import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    StatusBar,
    ActivityIndicator,
} from "react-native";
import { Video } from "expo-av";
import { Card } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export function VideoScreen({
    route,
    setFavoriteVideoList,
    setWatchLaterVideoList,
    favoriteVideoList,
    watchLaterVideoList,
}) {
    const { edgeUri, partnerUri, title } = route.params;

    const [uri, setUri] = useState(null);
    const [isInFavorite, setIsInFavorite] = useState(
        watchLaterVideoList.includes(title)
    );
    const [isInWatchLater, setIsInWatchLater] = useState(
        favoriteVideoList.includes(title)
    );
    const video = React.useRef(null);

    useEffect(() => {
        let abortController = new AbortController();
        let aborted = abortController.signal.aborted;
        async function fetchUri() {
            try {
                aborted = abortController.signal.aborted;

                const response = await fetch(edgeUri, {
                    method: "GET",
                });

                if (aborted == false) {
                    if (response.ok) {
                        setUri(edgeUri);
                    } else {
                        setUri(partnerUri);
                    }
                }
            } catch (e) {}
        }
        fetchUri();
        setIsInFavorite(favoriteVideoList.includes(title));
        setIsInWatchLater(watchLaterVideoList.includes(title));
        return () => {
            abortController.abort();
        };
    }, []);

    const handleVideoRef = async (component) => {
        try {
            if (video.current != null) {
                await video.current.unloadAsync();
                video.current = null;
            }
            const source = { uri: uri };
            const initialState = {
                shouldPlay: false,
            };
            video.current = component;
            video.current.loadAsync(source, initialState, false);
        } catch (e) {}
    };

    if (uri == null) {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="default" />
                <ActivityIndicator
                    style={{ marginTop: "auto", marginBottom: "auto" }}
                    size="large"
                    color="#00ff00"
                    animating={uri == null}
                />
            </View>
        );
    }

    const pressedFavorite = () => {
        let tempVideoList;
        if (isInFavorite) {
            tempVideoList = favoriteVideoList.filter((value) => value != title);
            setIsInFavorite(false);
        } else {
            tempVideoList = [...favoriteVideoList, title];
            setIsInFavorite(true);
        }
        setFavoriteVideoList(tempVideoList);
    };

    const pressedWatchLater = () => {
        let tempVideoList;
        if (isInWatchLater) {
            tempVideoList = watchLaterVideoList.filter(
                (value) => value != title
            );
            setIsInWatchLater(false);
        } else {
            tempVideoList = [...watchLaterVideoList, title];
            setIsInWatchLater(true);
        }
        setWatchLaterVideoList(tempVideoList);
    };

    return (
        <View style={styles.container}>
            <Card>
                <Card.Title
                    style={{ textTransform: "capitalize", fontSize: 24 }}
                >
                    {title}
                </Card.Title>
                <Card.Divider />
                {uri ? (
                    <Video
                        ref={handleVideoRef}
                        useNativeControls
                        style={styles.video}
                        resizeMode="contain"
                    />
                ) : (
                    <Text>Sorry Video is not available currently</Text>
                )}
                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={[styles.button, { marginRight: 4 }]}
                        onPress={pressedFavorite}
                    >
                        <MaterialIcons
                            name={"favorite"}
                            size={20}
                            color={isInFavorite ? "#53bb53" : "black"}
                            backgroundColor={"#acacac"}
                        />
                        <Text style={{ marginLeft: 4 }}>Mark Favorite</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, { marginLeft: 4 }]}
                        onPress={pressedWatchLater}
                    >
                        <MaterialIcons
                            name={"watch-later"}
                            size={20}
                            color={isInWatchLater ? "#53bb53" : "black"}
                            backgroundColor={"#acacac"}
                        />
                        <Text style={{ marginLeft: 4 }}>Mark Watch Later</Text>
                    </TouchableOpacity>
                </View>
            </Card>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    video: {
        alignSelf: "stretch",
        height: height / 3,
        marginBottom: 8,
    },
    buttons: {
        flexDirection: "row",
        alignSelf: "stretch",
        justifyContent: "space-around",
        alignItems: "center",
    },
    button: {
        padding: 10,
        marginVertical: 4,
        borderRadius: 4,
        backgroundColor: "#DDDDDD",
        flexDirection: "row",
        alignItems: "center",
    },
});
