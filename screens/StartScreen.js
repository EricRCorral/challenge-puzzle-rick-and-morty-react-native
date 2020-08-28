import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Title, Txt } from "../components/Components";

const StartScreen = ({ navigation }) => {
  const date = `${new Date().getDate()}/${
    new Date().getMonth() + 1
  }/${new Date().getFullYear()}`;

  return (
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
        <Txt>{date}</Txt>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: "7%",
  },
  box1: {
    alignItems: "center",
    marginTop: "13%",
  },
  box2: {
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    marginBottom: "3%",
  },
  name: {
    fontSize: 20,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    marginBottom: "5%",
  },
});

export default StartScreen;
