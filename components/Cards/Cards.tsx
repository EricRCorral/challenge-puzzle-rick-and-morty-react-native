import React, { Ref, useRef } from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Title from "../Title/Title";
import { connect } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { setCurrentCardAction, getDataAction } from "../../actions/query";
import { Response as CharactersResponse } from "../../apollo/queries/queryCharacters";
import { Response as EpisodesResponse } from "../../apollo/queries/queryEpisodes";
import { Response as LocationsResponse } from "../../apollo/queries/queryLocations";
import styles from "./styles";

import { PORTAL } from "../../assets/images";

interface State {
  filter: string;
  data: CharactersResponse | EpisodesResponse | LocationsResponse;
  currentCard: number;
  setCurrentCardAction: { (index: number): any };
  getDataAction: { (next?: number): any };
}

const Cards = ({
  filter,
  data,
  currentCard,
  setCurrentCardAction,
  getDataAction,
}: State) => {
  const NAVIGATION = useNavigation();

  const navigateToCard = (currentCard: number) => {
    setCurrentCardAction(currentCard);
    NAVIGATION.navigate("Details");
  };

  const actualScreen = useRoute().name;

  const RESULTS: any =
    filter === "characters"
      ? data.characters?.results
      : filter === "locations"
      ? data.locations?.results
      : data.episodes?.results;

  const REQUIRED_DATA =
    actualScreen === "Details"
      ? filter === "locations"
        ? RESULTS?.[currentCard].residents?.slice(0, 5)
        : RESULTS?.[currentCard].characters?.slice(0, 5)
      : undefined;

  const NEXT =
    filter === "characters"
      ? data.characters?.info.next
      : filter === "locations"
      ? data.locations?.info.next
      : data.episodes?.info.next;

  const FLAT_LIST_REF: Ref<any> = useRef();

  const scrollPrevLastIndex = () => {
    if (!!NEXT && NEXT > 2) {
      return FLAT_LIST_REF.current.scrollToIndex({
        animated: false,
        index: (NEXT - 2) * 20 - 4,
        viewOffset: -50,
      });
    } else if (!NEXT && RESULTS.length > 20) {
      FLAT_LIST_REF.current.scrollToIndex({
        animated: false,
        index: RESULTS.length - (RESULTS.length % 20) - 4,
        viewOffset: -50,
      });
    }
  };

  return (
    <FlatList
      ref={FLAT_LIST_REF}
      initialNumToRender={RESULTS.length - 1}
      onContentSizeChange={scrollPrevLastIndex}
      data={!REQUIRED_DATA ? RESULTS : REQUIRED_DATA}
      style={!REQUIRED_DATA && styles.spaceBottom}
      ListFooterComponentStyle={styles.loader}
      onEndReached={() => getDataAction(NEXT)}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        !!NEXT && <Image source={PORTAL} style={styles.portal} />
      }
      renderItem={({ item, index }) => (
        <TouchableOpacity
          disabled={!!REQUIRED_DATA}
          key={item.id}
          onPress={() => navigateToCard(index)}
        >
          <View style={styles.card}>
            {filter === "characters" || !!REQUIRED_DATA ? (
              <>
                <Image
                  style={styles.image}
                  source={{
                    uri: item.image,
                  }}
                />
                <Title
                  style={{
                    ...styles.characterTitle,
                    color: actualScreen == "Details" ? "white" : "black",
                  }}
                >
                  {item.name}
                </Title>
              </>
            ) : (
              <View style={styles.box}>
                <Title style={{color: "black"}}>{item.name}</Title>
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
    data: state.data,
  };
}

export default connect(mapStateToProps, {
  setCurrentCardAction,
  getDataAction,
})(Cards);
