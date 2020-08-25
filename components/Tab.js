import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Txt from "./Txt";

const Tab = (props) => {
  return props.filter !== "|" ? (
    <TouchableOpacity
      style={styles.tab}
      onPress={() => props.setFilter(props.filter.toLowerCase())}
    >
      <Txt
        style={{
          color:
            props.filter.toLowerCase() === props.currentFilter
              ? "darkblue"
              : "black",
          ...styles.text,
        }}
      >
        {props.filter}
      </Txt>
    </TouchableOpacity>
  ) : (
    <View style={styles.divider}>
      <Txt>|</Txt>
    </View>
  );
};

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
  divider: {
    justifyContent: "center",
  },
});

export default Tab;
