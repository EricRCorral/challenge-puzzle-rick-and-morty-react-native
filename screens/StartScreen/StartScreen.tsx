import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Title, Txt } from "../../components";
import styles from "./styles";

const DATE = `${new Date().getDate()}/${
  new Date().getMonth() + 1
}/${new Date().getFullYear()}`;

const StartScreen = ({ navigation }: any) => (
  <View style={styles.container}>
    <View style={styles.box1}>
      <Title style={styles.title}>REACT NATIVE CHALLENGE</Title>
      <Txt style={styles.name}>Eric Roger Corral</Txt>
    </View>
    <View style={styles.box2}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Search")}
        style={styles.button}
      >
        <Txt>ENTER</Txt>
      </TouchableOpacity>
      <Txt>{DATE}</Txt>
    </View>
  </View>
);

export default StartScreen;
