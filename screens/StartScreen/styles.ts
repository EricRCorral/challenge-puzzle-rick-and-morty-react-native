import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
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
    borderColor: "darkgrey"
  },
});

export default styles;
