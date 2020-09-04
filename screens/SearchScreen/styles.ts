import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  searcherBox: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  icon: {
    marginLeft: 3,
  },
  image: {
    width: "100%",
    height: "55%",
    position: "absolute",
    bottom: "5%",
  },
  text: {
    fontSize: 22,
    textAlign: "center",
    marginTop: "5%",
  },
  boxImage: {
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default styles;
