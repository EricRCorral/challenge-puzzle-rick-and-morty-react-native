import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  nameBox: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 15,
  },
  name: {
    fontSize: 24,
  },
  image: {
    width: "100%",
    height: 350,
    borderRadius: 160
  },
  inline: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 7,
  },
  filterSelectTitle: {
    marginTop: 15,
    marginBottom: 5,
  },
});

export default styles;
