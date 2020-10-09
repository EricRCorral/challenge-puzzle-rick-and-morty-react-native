import React from "react";
import { TouchableOpacity } from "react-native";
import Txt from "../Txt/Txt";
import { connect } from "react-redux";
import { setFilterAction } from "../../actions/query";
import styles from "./styles";

interface State {
  filter: string;
  setFilterAction: { (filter: string): any };
}

const TABS = ["Characters", "Locations", "Episodes"];

const Tab = ({ filter, setFilterAction }: State) => (
  <>
    {TABS.map((tabFilterName, i) => (
      <TouchableOpacity
        key={tabFilterName}
        style={[
          styles.tab,
          {
            backgroundColor:
              tabFilterName.toLowerCase() === filter ? "#7ec4bf" : "white",
          },
        ]}
        onPress={() => setFilterAction(tabFilterName.toLowerCase())}
      >
        <Txt
          style={{
            color:
              tabFilterName.toLowerCase() === filter ? "white" : "black",
            ...styles.text,
          }}
        >
          {tabFilterName}
        </Txt>
      </TouchableOpacity>
    ))}
  </>
);
function mapStateToProps(state: State) {
  return {
    filter: state.filter,
  };
}

export default connect(mapStateToProps, { setFilterAction })(Tab);
