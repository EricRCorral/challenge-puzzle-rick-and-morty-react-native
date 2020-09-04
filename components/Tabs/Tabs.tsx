import React from "react";
import { View } from "react-native";
import styles from "./styles";

const Tabs = (props: any) => <View style={styles.tabs}>{props.children}</View>;
export default Tabs;
