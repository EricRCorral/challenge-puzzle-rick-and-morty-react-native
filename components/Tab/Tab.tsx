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
    {TABS.map((tabFilterName) => (
      <TouchableOpacity
        key={tabFilterName}
        style={styles.tab}
        onPress={() => setFilterAction(tabFilterName.toLowerCase())}
      >
        <Txt
          style={[
            styles.text,
            {
              color: tabFilterName.toLowerCase() === filter ? "white" : "grey",
            },
          ]}
        >
          {tabFilterName}
        </Txt>
      </TouchableOpacity>
    ))}
  </>
);
const mapStateToProps = (state: State) => ({
  filter: state.filter,
});

export default connect(mapStateToProps, { setFilterAction })(Tab);
