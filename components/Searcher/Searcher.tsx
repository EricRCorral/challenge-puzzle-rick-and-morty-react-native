import React from "react";
import { TextInput } from "react-native";
import { connect } from "react-redux";
import { setNameAction } from "../../redux/queryDuck";
import styles from "./styles";

interface State {
  name: string;
  setNameAction: { (name: string): any };
}

const Searcher = ({ name, setNameAction }: State) => (
  <TextInput
    placeholder="Character, location, episode..."
    style={styles.searcher}
    value={name}
    onChange={(e) => setNameAction(e.nativeEvent.text)}
  />
);

function mapStateToProps(state: State) {
  return {
    name: state.name,
  };
}

export default connect(mapStateToProps, { setNameAction })(Searcher);
