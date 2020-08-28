import React from "react";
import { View, StyleSheet } from "react-native";

const Tabs = (props: any) => {
  return <View style={styles.tabs}>{props.children}</View>;
};

const styles = StyleSheet.create({
  tabs: {
    position: "absolute",
    bottom: 0,
    height: 65,
    width: "112%",
    flexDirection: "row",
    backgroundColor: "white",
    borderTopWidth: 1,
    marginBottom: "-6%",
    marginLeft: "-6%",
  },
});

export default Tabs;
