import React from "react";
import { Text } from "react-native";
import styles from "./styles";

const Title = (props: any) => (
  <Text style={[styles.title, props.style]}>{props.children}</Text>
);
export default Title;
