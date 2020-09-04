import React from "react";
import { View } from "react-native";
import styles from "./styles";

const Container = (props: any) => (
  <View style={styles.container}>{props.children}</View>
);
export default Container;
