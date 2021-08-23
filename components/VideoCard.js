import React, { useRef, useState } from "react";
import { View, StyleSheet, Image } from "react-native";

export default function VideoCard({ item }) {
    // console.log(item);
    const video = useRef(null);

    const loadPlayBackInstance = async (playing, uri) => {
        if (playbackInstance.current != null) {
            playbackInstance.current.stopAsync();
            await playbackInstance.current.unloadAsync();
        }
        const source = { uri };
        const initialStatus = {
            shouldPlay: playing,
        };
        await video.current.loadAsync(source, initialStatus);
        playbackInstance.current = video.current;
    };

    const handleVideoRef = (component) => {
        video.current = component;
        loadPlayBackInstance(false);
    };

    return (
        <View style={styles.card}>
            <Video
                style={styles.video}
                ref={handleVideoRef}
                useNativeControls
                resizeMode="contain"
            />
            <Text>{item.name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        elevation: 5,
        shadowColor: "#333",
        shadowOffset: { height: 2, width: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    thumbnail: {
        width: 320,
        height: 200,
    },
});

// const video = useRef(null);

//         const loadPlayBackInstance = async (playing, uri) => {
//             if (playbackInstance.current != null) {
//                 playbackInstance.current.stopAsync();
//                 await playbackInstance.current.unloadAsync();
//             }
//             const source = { uri };
//             const initialStatus = {
//                 shouldPlay: playing,
//             };
//             await video.current.loadAsync(source, initialStatus);
//             playbackInstance.current = video.current;
//         };

//         const handleVideoRef = (component) => {
//             video.current = component;
//             loadPlayBackInstance(false);
//         };
