import React, { useEffect } from "react";
import { View, Image, ScrollView, StyleSheet } from "react-native";
import { Container, Title, Cards, Txt } from "../../components";
import { connect } from "react-redux";
import { setRequiredDataAction } from "../../redux/queryDuck";
import { useNavigation } from "@react-navigation/native";
import { Response as CharactersResponse } from "../../apollo/queries/queryCharacters";
import { Response as EpisodesResponse } from "../../apollo/queries/queryEpisodes";
import { Response as LocationsResponse } from "../../apollo/queries/queryLocations";
import styles from './styles'

interface State {
  data: CharactersResponse | EpisodesResponse | LocationsResponse;
  filter: string;
  currentCard: number;
  setRequiredDataAction: { (filterNoCharacters: boolean): any };
}

const DetailsScreen = ({ data, filter, setRequiredDataAction }: State) => {
  const REQUIRED_DATA = filter === "locations" ? "residents" : "characters";

  const {
    image,
    name,
    gender,
    species,
    type,
    dimension,
    episode,
    air_date,
  } = data;

  const BEFORE_REMOVE = useNavigation().addListener;

  useEffect(() => {
    BEFORE_REMOVE("beforeRemove", () => setRequiredDataAction(false));
  }, []);

  return filter === "characters" ? (
    <Container>
      <ScrollView>
        <Image style={styles.image} source={{ uri: image }} />
        <View style={styles.nameBox}>
          <Title style={styles.name}>{name.toUpperCase()}</Title>
        </View>
        <View style={styles.inline}>
          <Title>Gender: </Title>
          <Txt>{gender}</Txt>
        </View>
        <View style={styles.inline}>
          <Title>Specie: </Title>
          <Txt>{species}</Txt>
        </View>
        {type !== "" && (
          <View style={styles.inline}>
            <Title>Type: </Title>
            <Txt>{type}</Txt>
          </View>
        )}
      </ScrollView>
    </Container>
  ) : (
    <Container>
      <ScrollView>
        <View style={styles.nameBox}>
          <Title style={styles.name}>{name.toUpperCase()}</Title>
        </View>
        {!!dimension && (
          <View style={styles.inline}>
            <Title>Dimension: </Title>
            <Txt>{dimension}</Txt>
          </View>
        )}
        {!!type && (
          <View style={styles.inline}>
            <Title>Type: </Title>
            <Txt>{type}</Txt>
          </View>
        )}
        {!!episode && (
          <View style={styles.inline}>
            <Title>Episode: </Title>
            <Txt>{episode}</Txt>
          </View>
        )}
        {!!air_date && (
          <View style={styles.inline}>
            <Title>Air date: </Title>
            <Txt>{air_date}</Txt>
          </View>
        )}

        {data[REQUIRED_DATA].image !== null && (
          <>
            <View style={styles.filterSelectTitle}>
              <Title>
                {filter === "locations" ? "Residents:" : "Characters:"}
              </Title>
            </View>
            <Cards />
          </>
        )}
      </ScrollView>
    </Container>
  );
};

function mapStateToProps(state: State) {
  return {
    data: state.data[state.filter].results[state.currentCard],
    filter: state.filter,
  };
}

export default connect(mapStateToProps, { setRequiredDataAction })(
  DetailsScreen
);
