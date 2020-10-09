import React from "react";
import { TextInput } from "react-native";
import { connect } from "react-redux";
import { setSearcherValueAction } from "../../actions/query";
import styles from "./styles";

interface State {
  searcherValue: string;
  setSearcherValueAction: { (searcherValue: string): any };
}

const Searcher = ({ searcherValue, setSearcherValueAction }: State) => (
  <TextInput
    placeholder="Character, location, episode..."
    style={styles.searcher}
    value={searcherValue}
    onChange={(e) => setSearcherValueAction(e.nativeEvent.text)}
  />
);

function mapStateToProps(state: State) {
  return {
    searcherValue: state.searcherValue,
  };
}

export default connect(mapStateToProps, { setSearcherValueAction })(Searcher);
