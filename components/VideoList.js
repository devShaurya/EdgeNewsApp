import { Video } from "expo-av";
import React, { useRef, useEffect, useState } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    TextInput,
    FlatList,
    StatusBar,
    Image,
    TouchableOpacity,
} from "react-native";
// import Video from "react-native-video";

export default function VideoList({
    isLoading,
    filteredVideoList,
    navigation,
}) {
    const [searchName, setSearchName] = useState("");
    const playbackInstance = useRef(null);
    const video = useRef(null);
    if (isLoading) {
        return (
            <View style={[styles.screen]}>
                <StatusBar barStyle="default" />
                <ActivityIndicator
                    style={{ marginTop: "auto", marginBottom: "auto" }}
                    size="large"
                    color="#00ff00"
                    animating={isLoading}
                />
            </View>
        );
    }
    // console.log("filterVideoList", filteredVideoList);

    const VideoCard = ({ item }) => {
        return (
            <View style={styles.card}>
                <TouchableOpacity
                    // <Text
                    style={styles.titleButton}
                    onPress={() => {
                        navigation.navigate({
                            name: "video",
                            params: {
                                edgeUri: item.content_url,
                                partnerUri: item.partner_content_url,
                            },
                        });
                    }}
                >
                    <Text style={styles.titleText}>{item.name}</Text>
                </TouchableOpacity>
                <View style={styles.faveAndWatchLater}></View>
            </View>
        );
    };

    return (
        <View style={[styles.screen]}>
            <StatusBar barStyle="default" />
            <TextInput
                style={styles.textInputStyle}
                onChangeText={(text) => setSearchName(text)}
                value={searchName}
                underlineColorAndroid="transparent"
                placeholder="Search Here"
            />
            <FlatList
                data={filteredVideoList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <VideoCard item={item} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: "#fff",
        flex: 1,
        paddingHorizontal: 8,
    },
    textInputStyle: {
        height: 40,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        fontSize: 16,
        borderColor: "#53bb53",
    },
    card: {
        elevation: 5,
        shadowColor: "#333",
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        borderRadius: 6,
        marginHorizontal: 4,
        marginVertical: 6,
    },
    titleButton: {
        padding: 8,
        marginVertical: 4,
    },
    titleText: {
        fontWeight: "bold",
        fontSize: 16,
        paddingLeft: 16,
    },
    faveAndWatchLater: {
        flexDirection: "row",
        flex: 1,
    },
});
