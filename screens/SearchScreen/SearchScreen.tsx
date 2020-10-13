import React from "react";
import { PORTAL, SEARCH_BACKGROUND } from "../../assets/images";
import { TouchableOpacity, Image, View, ImageBackground } from "react-native";
import {
  Searcher,
  Container,
  Cards,
  Tab,
  Tabs,
  Txt,
  Title,
} from "../../components";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { setSearcherValueAction } from "../../actions/query";
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
          <Title style={styles.text}>Start your search, get schwifty !</Title>
        </>
      );
    }

    if (error) {
      return <Txt style={styles.text}>Something goes wrong ❌</Txt>;
    }

    if (fetching) return <Image source={PORTAL} style={styles.portal} />;

    if (!DATA_FILTERED)
      return (
        <Title style={styles.text}>
          Nothing here, try other words to get schwifty !
        </Title>
      );

    return <Cards />;
  };

  return (
    <ImageBackground source={SEARCH_BACKGROUND} style={styles.backgroundImage}>
      <Container>
        <View style={styles.searcherBox}>
          <Searcher />
          <TouchableOpacity onPress={() => setSearcherValueAction("")}>
            <Ionicons
              name="md-remove-circle"
              color="red"
              size={50}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        <Search />

        <Tabs>
          <Tab></Tab>
        </Tabs>
      </Container>
    </ImageBackground>
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
})(SearchScreen);
