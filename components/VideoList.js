import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    TextInput,
    FlatList,
    StatusBar,
} from "react-native";
import { Card } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";

export default function VideoList({ isLoading, masterVideoList, navigation }) {
    const [searchName, setSearchName] = useState("");
    const [filteredVideoList, setFilteredVideoList] = useState(masterVideoList);

    useEffect(() => {
        setFilteredVideoList(masterVideoList);
        setSearchName("");
    }, [isLoading, masterVideoList]);

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

    const onSearchTextChange = (text) => {
        if (text) {
            const newData = masterVideoList.filter(function (item) {
                const itemData = item.name ? item.name.toLowerCase() : "";
                const textData = text.toLowerCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredVideoList(newData);
            setSearchName(text);
        } else {
            setFilteredVideoList(masterVideoList);
            setSearchName(text);
        }
    };

    const VideoCard = ({ item }) => {
        const navigateToShowVideo = () => {
            navigation.navigate({
                name: "video",
                params: {
                    edgeUri: item.content_url,
                    partnerUri: item.partner_content_url,
                    title: item.name,
                },
            });
        };

        return (
            <Card>
                <View style={styles.card}>
                    <Text
                        style={{
                            textTransform: "capitalize",
                            fontWeight: "500",
                            flex: 0.8,
                        }}
                    >
                        {item.name}
                    </Text>

                    <MaterialIcons.Button
                        name={"play-circle-filled"}
                        style={{ flex: 0.2 }}
                        backgroundColor={"#53bb53"}
                        onPress={navigateToShowVideo}
                    >
                        Play
                    </MaterialIcons.Button>
                </View>
            </Card>
        );
    };

    return (
        <View style={[styles.screen]}>
            <StatusBar barStyle="default" />
            <TextInput
                style={styles.textInputStyle}
                onChangeText={onSearchTextChange}
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
        flexDirection: "row",
        alignSelf: "stretch",
        justifyContent: "space-between",
        alignItems: "center",
    },
});
