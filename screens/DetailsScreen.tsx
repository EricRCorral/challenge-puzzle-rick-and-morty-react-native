import React, { useEffect } from "react";
import { View, Image, ScrollView, StyleSheet } from "react-native";
import { Container, Title, Cards, Txt } from "../components/Components";
import { connect } from "react-redux";
import { setFilterSelectAction } from "../redux/queryDuck";
import { useNavigation } from "@react-navigation/native";
import { State } from "../interfaces/State";

const DetailsScreen = ({ data, filter, setFilterSelectAction }: State) => {
  let filterSelect = filter === "locations" ? "residents" : "characters";

  const beforeRemove = useNavigation().addListener;

  useEffect(() => {
    beforeRemove("beforeRemove", () => setFilterSelectAction(false));
  }, []);

  return filter === "characters" ? (
    <Container>
      <ScrollView>
        <Image style={styles.image} source={{ uri: data.image }} />
        <View style={styles.nameBox}>
          <Title style={styles.name}>{data.name.toUpperCase()}</Title>
        </View>
        <View style={styles.inline}>
          <Title>Gender: </Title>
          <Txt>{data.gender}</Txt>
        </View>
        <View style={styles.inline}>
          <Title>Specie: </Title>
          <Txt>{data.species}</Txt>
        </View>
        {data.type !== "" && (
          <View style={styles.inline}>
            <Title>Type: </Title>
            <Txt>{data.type}</Txt>
          </View>
        )}
      </ScrollView>
    </Container>
  ) : (
    <Container>
      <ScrollView>
        <View style={styles.nameBox}>
          <Title style={styles.name}>{data.name.toUpperCase()}</Title>
        </View>
        {data.dimension && (
          <View style={styles.inline}>
            <Title>Dimension: </Title>
            <Txt>{data.dimension}</Txt>
          </View>
        )}
        {data.type && (
          <View style={styles.inline}>
            <Title>Type: </Title>
            <Txt>{data.type}</Txt>
          </View>
        )}
        {data.episode && (
          <View style={styles.inline}>
            <Title>Episode: </Title>
            <Txt>{data.episode}</Txt>
          </View>
        )}
        {data.air_date && (
          <View style={styles.inline}>
            <Title>Air date: </Title>
            <Txt>{data.air_date}</Txt>
          </View>
        )}

        {data[filterSelect].image !== null && (
          <>
            <View style={styles.filterSelectTitle}>
              {filter === "locations" ? (
                <Title>Residents:</Title>
              ) : (
                <Title>Characters:</Title>
              )}
            </View>
            <Cards />
          </>
        )}
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  nameBox: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 15,
  },
  name: {
    fontSize: 24,
  },
  image: {
    width: "100%",
    height: 350,
  },
  inline: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 7,
  },
  filterSelectTitle: {
    marginTop: 15,
    marginBottom: 5,
  },
});

function mapState(state: State) {
  return {
    data: state.data[state.filter].results[state.currentCard],
    filter: state.filter,
  };
}

export default connect(mapState, { setFilterSelectAction })(DetailsScreen);
