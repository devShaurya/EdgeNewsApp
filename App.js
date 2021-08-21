import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import PagerView from "react-native-pager-view";

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

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [videoLinksList, setVideoLinksList] = useState([]);
  const pagerViewRef = useRef(null);

  async function fetchData() {
    try {
      const response = await fetch(
        `https://developerapis.stg-alefedge.com/et/api/v1/stream-tech/content/get-all?partner_name=${partnerName}`,
        requestOptions
      ).then((response) => response.json());
      var tempVideoList = [];
      response.map(({ content_url, partner_cloud_url } = val) => {
        tempVideoList = [...tempVideoList, { content_url, partner_cloud_url }];
      });
      setVideoLinksList(tempVideoList);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const onPageSelected = (event) => {};

  return (
    <View
      style={isLoading ? [styles.container, styles.page] : styles.container}
    >
      <ActivityIndicator size="large" color="#00ff00" animating={isLoading} />
      {!isLoading && (
        <PagerView
          ref={pagerViewRef}
          style={styles.viewPager}
          initialPage={0}
          onPageSelected={onPageSelected}
        >
          <View style={styles.page} key="1">
            <Text>First page</Text>
          </View>
          <View style={styles.page} key="2">
            <Text>Second page</Text>
          </View>
          <View style={styles.page} key="3">
            <Text>Third page</Text>
          </View>
        </PagerView>
      )}
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      <StatusBar style="light" />
      {/* <Vid */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  viewPager: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
});
