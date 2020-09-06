import React from "react";
import { IMG } from "../../assets/images";
import { TouchableOpacity, ActivityIndicator, Image, View } from "react-native";
import { Searcher, Container, Cards, Tab, Tabs, Txt } from "../../components";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { setNameAction, setCurrentCardAction } from "../../redux/queryDuck";
import { Response as CharactersResponse } from "../../apollo/queries/queryCharacters";
import { Response as EpisodesResponse } from "../../apollo/queries/queryEpisodes";
import { Response as LocationsResponse } from "../../apollo/queries/queryLocations";
import styles from "./styles";

interface State {
  data: CharactersResponse | EpisodesResponse | LocationsResponse;
  filter: string;
  name: string;
  fetching: boolean;
  error: boolean;
  setNameAction: { (name: string): any };
}

const SearchScreen = ({
  data,
  name,
  fetching,
  error,
  setNameAction,
}: State) => (
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

    {(() => {
      if (name.length < 3) {
        return (
          <>
            <Txt style={styles.text}>
              Here will appear what you are searching
            </Txt>
            <Image source={IMG} style={styles.image} />
          </>
        );
      }

      if (error) {
        return <Txt style={styles.text}>Something goes wrong ❌</Txt>;
      }

      if (fetching) return <ActivityIndicator color="#7ec4bf" size="large" />;

      if (!data) return <Txt style={styles.text}>No results 😔</Txt>;

      return <Cards />;
    })()}
    <Tabs>
      <Tab></Tab>
    </Tabs>
  </Container>
);

function mapStateToProps(state: State) {
  return {
    name: state.name,
    fetching: state.fetching,
    error: state.error,
    data: state.data[state.filter],
  };
}

export default connect(mapStateToProps, {
  setNameAction,
  setCurrentCardAction,
})(SearchScreen);
