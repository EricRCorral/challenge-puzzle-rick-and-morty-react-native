import React from "react";
import { TextInput, StyleSheet } from "react-native";

const Searcher = (props) => {
  return (
    <TextInput
      placeholder="Character, location, episode..."
      style={styles.searcher}
      value={props.name}
      onChange={(e) => props.setName(e.nativeEvent.text)}
    />
  );
};

const styles = StyleSheet.create({
  searcher: {
    width: "90%",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 2,
  },
});

export default Searcher;
