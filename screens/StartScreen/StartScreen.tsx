import React from "react";
import { View, TouchableOpacity, ImageBackground } from "react-native";
import { Title, Txt } from "../../components";
import styles from "./styles";
import { START_BACKGROUND } from "../../assets/images";

const DATE = `${new Date().getDate()}/${
  new Date().getMonth() + 1
}/${new Date().getFullYear()}`;

const StartScreen = ({ navigation }: any) => (
  <ImageBackground source={START_BACKGROUND} style={styles.backgroundImage}>
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
          <Txt>Get Schwifty!</Txt>
        </TouchableOpacity>
        <Txt>{DATE}</Txt>
      </View>
    </View>
  </ImageBackground>
);

export default StartScreen;
