import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Txt from "./Txt";
import { connect } from "react-redux";
import { setFilterAction } from "../redux/queryDuck";
import { State } from "../interfaces/State";

const Tab = ({ filter, setFilterAction }: State) => {
  const tabs = ["Characters", "|", "Locations", "|", "Episodes"];

  return (
    <>
      {tabs.map((tabFilterName, i) =>
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
};

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
  divider: {
    justifyContent: "center",
  },
});

function mapState(state: State) {
  return {
    filter: state.filter,
  };
}

export default connect(mapState, { setFilterAction })(Tab);
