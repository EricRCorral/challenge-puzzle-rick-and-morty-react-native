import React from "react";
import { View, TouchableOpacity } from "react-native";
import Txt from "../Txt/Txt";
import { connect } from "react-redux";
import { setFilterAction } from "../../redux/queryDuck";
import styles from "./styles";

interface State {
  filter: string;
  setFilterAction: { (filter: string): any };
}

const TABS = ["Characters", "|", "Locations", "|", "Episodes"];

const Tab = ({ filter, setFilterAction }: State) => (
  <>
    {TABS.map((tabFilterName, i) =>
      tabFilterName !== "|" ? (
        <TouchableOpacity
          key={tabFilterName}
          style={styles.tab}
          onPress={() => setFilterAction(tabFilterName.toLowerCase())}
        >
          <Txt
            style={{
              color:
                tabFilterName.toLowerCase() === filter ? "darkblue" : "black",
              ...styles.text,
            }}
          >
            {tabFilterName}
          </Txt>
        </TouchableOpacity>
      ) : (
        <View key={`${tabFilterName}${i}`} style={styles.divider}>
          <Txt>|</Txt>
        </View>
      )
    )}
  </>
);
function mapStateToProps(state: State) {
  return {
    filter: state.filter,
  };
}

export default connect(mapStateToProps, { setFilterAction })(Tab);
