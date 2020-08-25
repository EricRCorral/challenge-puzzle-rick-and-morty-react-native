import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  View,
} from "react-native";
import {
  Searcher,
  Container,
  Card,
  Tab,
  Tabs,
  Txt,
} from "../components/Components";
import { useQuery } from "@apollo/client";
import {
  queryCharacters,
  queryEpisodes,
  queryLocations,
} from "../apollo/queries";
import { Ionicons } from "@expo/vector-icons";

const SearchScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [filter, setFilter] = useState("characters");

  const tabs = ["Characters", "|", "Locations", "|", "Episodes"];

  let query =
    filter === "characters"
      ? queryCharacters
      : filter === "locations"
      ? queryLocations
      : queryEpisodes;

  const { loading, error, data, fetchMore } = useQuery(query, {
    variables: { name: { name: name }, page: 1 },
  });

  function fetchMoreData() {
    const { next } = data[filter].info;

    fetchMore({
      variables: { name: { name: name }, page: next },

      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (next === null) {
          return prevResult;
        } else {
          fetchMoreResult[filter].results = [
            ...prevResult[filter].results,
            ...fetchMoreResult[filter].results,
          ];
          return fetchMoreResult;
        }
      },
    });
  }

  return (
    <Container>
      <View style={styles.searcherBox}>
        <Searcher name={name} setName={setName} />
        <TouchableOpacity onPress={() => setName("")}>
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
      ) : loading ? (
        <ActivityIndicator color="darkblue" size="large" />
      ) : error ? (
        <Txt style={styles.text}>No results ❌</Txt>
      ) : (
        <FlatList
          data={data[filter].results}
          style={styles.spaceBottom}
          ListFooterComponent={
            data[filter].info.next !== null && (
              <ActivityIndicator color="darkblue" size="large" />
            )
          }
          ListFooterComponentStyle={styles.loader}
          onEndReached={fetchMoreData}
          onEndReachedThreshold={0.5}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Details", { filter: filter, data: item })
              }
            >
              <Card
                name={item.name}
                filter={filter}
                image={item.image}
                dimension={item.dimension}
                episode={item.episode}
              />
            </TouchableOpacity>
          )}
        />
      )}
      <Tabs>
        {tabs.map((tab, i) => (
          <Tab
            key={`${tab}${i}`}
            filter={tab}
            setFilter={setFilter}
            currentFilter={filter}
          />
        ))}
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
  spaceBottom: {
    marginBottom: "18%",
  },
  loader: {
    paddingTop: "5%",
    paddingBottom: "3%",
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

export default SearchScreen;
