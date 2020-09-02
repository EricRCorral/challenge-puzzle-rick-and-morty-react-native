import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Title from "./Title";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  setCurrentCardAction,
  setRequiredDataAction,
  getDataAction,
} from "../redux/queryDuck";
import { Response } from "../apollo/types";

interface State {
  filter: string;
  data: Response;
  currentCard: number;
  filterNoCharacters: boolean;
  setCurrentCardAction: { (index: number): any };
  setRequiredDataAction: { (filterNoCharacters: boolean): any };
  getDataAction: { (next: number): any };
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

  const REQUIRED_DATA = filter === "locations" ? "residents" : "characters";

  const navigate = (i: number) => {
    if (filter !== "characters") {
      setRequiredDataAction(true);
    }
    setCurrentCardAction(i);
    navigation.navigate("Details");
  };

  const fetchMoreData = (next: number) => {
    getDataAction(next);
  };

  return (
    <FlatList
      data={
        !filterNoCharacters
          ? data.results
          : data.results[currentCard][REQUIRED_DATA].slice(0, 5)
      }
      style={!filterNoCharacters && styles.spaceBottom}
      ListFooterComponentStyle={styles.loader}
      onEndReached={() => fetchMoreData(data.info.next)}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        !!data.info.next && (
          <ActivityIndicator color="darkblue" size="large" />
        )
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

const styles = StyleSheet.create({
  card: {
    width: "100%",
    marginTop: 10,
    padding: 8,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  spaceBottom: {
    marginBottom: "18%",
  },
  image: {
    width: 90,
    height: 90,
  },
  characterTitle: {
    marginLeft: 10,
  },
  text: {
    fontSize: 18,
    marginTop: 7,
  },
  box: {
    paddingVertical: 12,
    paddingLeft: 10,
  },
  loader: {
    paddingTop: "5%",
    paddingBottom: "3%",
  },
});

function mapStateToProps(state: State) {
  const filter = state.filter;
  return {
    data: state.data[filter],
    filter: filter,
    currentCard: state.currentCard,
    filterNoCharacters: state.filterNoCharacters,
  };
}

export default connect(mapStateToProps, {
  setCurrentCardAction,
  setRequiredDataAction,
  getDataAction,
})(Cards);
