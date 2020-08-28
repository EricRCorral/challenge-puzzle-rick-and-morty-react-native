import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  View,
} from "react-native";
import {
  Searcher,
  Container,
  Cards,
  Tab,
  Tabs,
  Txt,
} from "../components/Components";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { setNameAction, setCurrentCardAction } from "../redux/queryDuck";

const SearchScreen = ({ name, fetching, error, setNameAction }) => {
  return (
    <Container>
      <View style={styles.searcherBox}>
        <Searcher />
        <TouchableOpacity onPress={() => setNameAction("")}>
          <Ionicons
            name="md-remove-circle"
            size={50}
            color="red"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {name.length < 3 ? (
        <>
          <Txt style={styles.text}>Here will appear what you are searching</Txt>
          <Image
            source={require("../assets/images/rick-and-morty-search.png")}
            style={styles.image}
          />
        </>
      ) : error ? (
        <Txt style={styles.text}>No results ❌</Txt>
      ) : fetching ? (
        <ActivityIndicator color="darkblue" size="large" />
      ) : (
        <Cards />
      )}
      <Tabs>
        <Tab></Tab>
      </Tabs>
    </Container>
  );
};

const styles = StyleSheet.create({
  searcherBox: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  icon: {
    marginLeft: 3,
  },
  image: {
    width: "100%",
    height: "55%",
    position: "absolute",
    bottom: "5%",
  },
  text: {
    fontSize: 22,
    textAlign: "center",
    marginTop: "5%",
  },
  boxImage: {
    alignItems: "center",
    justifyContent: "space-between",
  },
});

function mapState(state) {
  return {
    name: state.name,
    fetching: state.fetching,
    error: state.error,
  };
}

export default connect(mapState, { setNameAction, setCurrentCardAction })(
  SearchScreen
);
