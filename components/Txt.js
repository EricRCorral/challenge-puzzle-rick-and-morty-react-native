import React from "react";
import { Text, StyleSheet } from "react-native";

const Txt = (props) => {
  return (
    <Text style={{ ...styles.text, ...props.style }}>{props.children}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
  },
});

export default Txt;
