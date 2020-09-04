import { StyleSheet } from "react-native";

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
  spaceBottom: {
    marginBottom: "18%",
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
  loader: {
    paddingTop: "5%",
    paddingBottom: "3%",
  },
});

export default styles