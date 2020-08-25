import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import Title from "./Title";

const Card = (props) => {
  return (
    <View key={props.name} style={{ ...styles.card, ...props.style }}>
      {props.filter === "characters" || props.id !== undefined ? (
        <>
          <Image
            style={styles.image}
            source={{
              uri: props.image,
            }}
          />
          <Title style={styles.characterTitle}>{props.name}</Title>
        </>
      ) : (
        <View style={styles.box}>
          <Title>{props.name}</Title>
          <Text style={styles.text}>
            {props.filter === "locations" ? props.dimension : props.episode}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    marginTop: 10,
    padding: 8,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 90,
    height: 90,
  },
  characterTitle: {
    marginLeft: 10,
  },
  text: {
    fontSize: 18,
    marginTop: 7,
  },
  box: {
    paddingVertical: 12,
    paddingLeft: 10,
  },
});

export default Card;
