import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  portal: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  searcherBox: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  icon: {
    marginLeft: 3,
  },
  text: {
    fontSize: 30,
    textAlign: "center",
    marginTop: "5%",
    color: "black"
  },
  boxImage: {
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default styles;
