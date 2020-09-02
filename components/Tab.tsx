import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Txt from "./Txt";
import { connect } from "react-redux";
import { setFilterAction } from "../redux/queryDuck";

interface State {
  filter: string;
  setFilterAction: { (filter: string): any };
}

const Tab = ({ filter, setFilterAction }: State) => {
  const TABS = ["Characters", "|", "Locations", "|", "Episodes"];

  return (
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

function mapStateToProps(state: State) {
  return {
    filter: state.filter,
  };
}

export default connect(mapStateToProps, { setFilterAction })(Tab);
