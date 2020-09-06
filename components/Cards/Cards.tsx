import React from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Title from "../Title/Title";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  setCurrentCardAction,
  setRequiredDataAction,
  getDataAction,
} from "../../redux/queryDuck";
import { Response as CharactersResponse } from "../../apollo/queries/queryCharacters";
import { Response as EpisodesResponse } from "../../apollo/queries/queryEpisodes";
import { Response as LocationsResponse } from "../../apollo/queries/queryLocations";
import styles from "./styles";

interface State {
  filter: string;
  data: CharactersResponse | EpisodesResponse | LocationsResponse;
  currentCard: number;
  filterNoCharacters: boolean;
  setCurrentCardAction: { (index: number): any };
  setRequiredDataAction: { (filterNoCharacters: boolean): any };
  getDataAction: { (next?: number): any };
}

const Cards = ({
  filter,
  data,
  currentCard,
  filterNoCharacters,
  setCurrentCardAction,
  setRequiredDataAction,
  getDataAction,
}: State) => {
  const navigation = useNavigation();

  const DATA_FILTERED =
    filter === "characters"
      ? data.characters?.results
      : filter === "locations"
      ? data.locations?.results
      : data.episodes?.results;

  const REQUIRED_DATA =
    filter === "locations"
      ? data.locations?.results[currentCard].residents?.slice(0, 5)
      : data.episodes?.results[currentCard].characters?.slice(0, 5);

  const NEXT =
    filter === "characters"
      ? data.characters?.info.next
      : filter === "locations"
      ? data.locations?.info.next
      : data.episodes?.info.next;

  const navigate = (i: number) => {
    if (filter !== "characters") {
      setRequiredDataAction(true);
    }
    setCurrentCardAction(i);
    navigation.navigate("Details");
  };

  const fetchMoreData = (next?: number) => {
    getDataAction(next);
  };

  return (
    <FlatList
      data={!filterNoCharacters ? DATA_FILTERED : REQUIRED_DATA}
      style={!filterNoCharacters && styles.spaceBottom}
      ListFooterComponentStyle={styles.loader}
      onEndReached={() => fetchMoreData(NEXT)}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        !!NEXT && <ActivityIndicator color="#7ec4bf" size="large" />
      }
      renderItem={({ item, index }) => (
        <TouchableOpacity
          disabled={filterNoCharacters}
          key={item.id}
          onPress={() => navigate(index)}
        >
          <View style={styles.card}>
            {filter === "characters" || filterNoCharacters ? (
              <>
                <Image
                  style={styles.image}
                  source={{
                    uri: item.image,
                  }}
                />
                <Title style={styles.characterTitle}>{item.name}</Title>
              </>
            ) : (
              <View style={styles.box}>
                <Title>{item.name}</Title>
                <Text style={styles.text}>
                  {filter === "locations" ? item.dimension : item.episode}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

function mapStateToProps(state: State) {
  return {
    filter: state.filter,
    currentCard: state.currentCard,
    filterNoCharacters: state.filterNoCharacters,
    data: state.data,
  };
}

export default connect(mapStateToProps, {
  setCurrentCardAction,
  setRequiredDataAction,
  getDataAction,
})(Cards);
