import React from "react";
import { IMG } from "../../assets/images";
import { TouchableOpacity, ActivityIndicator, Image, View } from "react-native";
import { Searcher, Container, Cards, Tab, Tabs, Txt } from "../../components";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { setSearcherValueAction, setCurrentCardAction } from "../../actions/query";
import { Response as CharactersResponse } from "../../apollo/queries/queryCharacters";
import { Response as EpisodesResponse } from "../../apollo/queries/queryEpisodes";
import { Response as LocationsResponse } from "../../apollo/queries/queryLocations";
import styles from "./styles";

interface State {
  data: CharactersResponse | EpisodesResponse | LocationsResponse;
  filter: string;
  searcherValue: string;
  fetching: boolean;
  error: boolean;
  setSearcherValueAction: { (searcherValue: string): any };
}

const SearchScreen = ({
  data,
  searcherValue,
  fetching,
  error,
  filter,
  setSearcherValueAction,
}: State) => {
  const DATA_FILTERED =
    filter === "characters"
      ? data.characters
      : filter === "locations"
      ? data.locations
      : data.episodes;

  const Search = () => {
    if (searcherValue.length < 3) {
      return (
        <>
          <Txt style={styles.text}>Here will appear what you are searching</Txt>
          <Image source={IMG} style={styles.image} />
        </>
      );
    }

    if (error) {
      return <Txt style={styles.text}>Something goes wrong ❌</Txt>;
    }

    if (fetching) return <ActivityIndicator color="#7ec4bf" size="large" />;

    if (DATA_FILTERED === null)
      return <Txt style={styles.text}>No results 😔</Txt>;

    return <Cards />;
  };

  return (
    <Container>
      <View style={styles.searcherBox}>
        <Searcher />
        <TouchableOpacity onPress={() => setSearcherValueAction("")}>
          <Ionicons
            name="md-remove-circle"
            size={50}
            color="red"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <Search />

      <Tabs>
        <Tab></Tab>
      </Tabs>
    </Container>
  );
};

function mapStateToProps(state: State) {
  return {
    searcherValue: state.searcherValue,
    fetching: state.fetching,
    error: state.error,
    data: state.data,
    filter: state.filter,
  };
}

export default connect(mapStateToProps, {
  setSearcherValueAction,
  setCurrentCardAction,
})(SearchScreen);
