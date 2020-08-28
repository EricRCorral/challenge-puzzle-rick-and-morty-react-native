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
  setFilterSelectAction,
  getDataAction,
} from "../redux/queryDuck";

const Cards = ({
  filter,
  dataFiltered,
  currentCard,
  isFilterSelect,
  setCurrentCardAction,
  setFilterSelectAction,
  getDataAction,
}) => {
  const navigation = useNavigation();

  let filterSelect = filter === "locations" ? "residents" : "characters";

  function navigate(i) {
    if (filter !== "characters") {
      setFilterSelectAction(true);
    }
    setCurrentCardAction(i);
    navigation.navigate("Details");
  }

  function fetchMoreData(next) {
    getDataAction(next);
  }

  return (
    <FlatList
      data={
        !isFilterSelect
          ? dataFiltered.results
          : dataFiltered.results[currentCard][filterSelect].slice(0, 5)
      }
      style={!isFilterSelect && styles.spaceBottom}
      ListFooterComponentStyle={styles.loader}
      onEndReached={() => fetchMoreData(dataFiltered.info.next)}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        dataFiltered.info.next !== null && (
          <ActivityIndicator color="darkblue" size="large" />
        )
      }
      renderItem={({ item, index }) => (
        <TouchableOpacity
          disabled={isFilterSelect}
          key={item.id}
          onPress={() => navigate(index)}
        >
          <View style={styles.card}>
            {filter === "characters" || isFilterSelect ? (
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

function mapState(state) {
  const filter = state.filter;
  return {
    dataFiltered: state.data[filter],
    filter: filter,
    currentCard: state.currentCard,
    isFilterSelect: state.isFilterSelect,
  };
}

export default connect(mapState, {
  setCurrentCardAction,
  setFilterSelectAction,
  getDataAction,
})(Cards);
