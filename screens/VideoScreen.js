import { Video } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export function VideoScreen({ route }) {
    const { edgeUri, partnerUri } = route.params;
    const [uri, setUri] = useState(null);
    const video = React.useRef(null);

    useEffect(() => {
        fetch(edgeUri, {
            method: "GET",
        }).then((response) => {
            if (response.ok) {
                setUri(edgeUri);
            } else {
                setUri(partnerUri);
            }
        });
        () => {
            if (ref.current != null) {
                ref.current.unloadAsync();
            }
        };
    }, []);

    return (
        <View style={styles.container}>
            {uri && (
                <Video
                    ref={video}
                    source={{ uri: uri }}
                    useNativeControls
                    style={styles.video}
                    resizeMode="contain"
                />
            )}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#000",
    },
    video: {
        alignSelf: "center",
        width: width,
        height: height / 2,
    },
});
