import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { setNameAction } from "../redux/queryDuck";

interface State {
  name: string;
  setNameAction: { (name: string): any };
}

const Searcher = ({ name, setNameAction }: State) => {
  return (
    <TextInput
      placeholder="Character, location, episode..."
      style={styles.searcher}
      value={name}
      onChange={(e) => setNameAction(e.nativeEvent.text)}
    />
  );
};

const styles = StyleSheet.create({
  searcher: {
    width: "90%",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 2,
  },
});

function mapStateToProps(state: State) {
  return {
    name: state.name,
  };
}

export default connect(mapStateToProps, { setNameAction })(Searcher);
