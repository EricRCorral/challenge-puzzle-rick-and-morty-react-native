import React, { useEffect } from "react";
import { View, Image, ScrollView } from "react-native";
import { Container, Title, Cards, Txt } from "../../components";
import { connect } from "react-redux";
import { setRequiredDataAction } from "../../redux/queryDuck";
import { useNavigation } from "@react-navigation/native";
import { Response as CharactersResponse } from "../../apollo/queries/queryCharacters";
import { Response as EpisodesResponse } from "../../apollo/queries/queryEpisodes";
import { Response as LocationsResponse } from "../../apollo/queries/queryLocations";
import styles from "./styles";

interface State {
  data: CharactersResponse | EpisodesResponse | LocationsResponse;
  filter: string;
  currentCard: number;
  setRequiredDataAction: { (filterNoCharacters: boolean): any };
}

const DetailsScreen = ({
  data,
  filter,
  currentCard,
  setRequiredDataAction,
}: State) => {
  const DATA =
    filter === "characters"
      ? data.characters?.results[currentCard]
      : filter === "locations"
      ? data.locations?.results[currentCard]
      : data.episodes?.results[currentCard];

  const REQUIRED_DATA =
    filter === "locations" ? DATA?.residents : DATA?.characters;

  const IMAGE = DATA?.image;
  const NAME = DATA?.name;
  const GENDER = DATA?.gender;
  const SPECIES = DATA?.species;
  const TYPE = DATA?.type;
  const DIMENSION = DATA?.dimension;
  const EPISODE = DATA?.episode;
  const AIR_DATE = DATA?.air_date;

  const BEFORE_REMOVE = useNavigation().addListener;

  useEffect(() => {
    BEFORE_REMOVE("beforeRemove", () => setRequiredDataAction(false));
  }, []);

  return filter === "characters" ? (
    <Container>
      <ScrollView>
        <Image style={styles.image} source={{ uri: IMAGE }} />
        <View style={styles.nameBox}>
          <Title style={styles.name}>{NAME?.toUpperCase()}</Title>
        </View>
        <View style={styles.inline}>
          <Title>Gender: </Title>
          <Txt>{GENDER}</Txt>
        </View>
        <View style={styles.inline}>
          <Title>Specie: </Title>
          <Txt>{SPECIES}</Txt>
        </View>
        {TYPE !== "" && (
          <View style={styles.inline}>
            <Title>Type: </Title>
            <Txt>{TYPE}</Txt>
          </View>
        )}
      </ScrollView>
    </Container>
  ) : (
    <Container>
      <ScrollView>
        <View style={styles.nameBox}>
          <Title style={styles.name}>{NAME?.toUpperCase()}</Title>
        </View>
        {!!DIMENSION && (
          <View style={styles.inline}>
            <Title>Dimension: </Title>
            <Txt>{DIMENSION}</Txt>
          </View>
        )}
        {!!TYPE && (
          <View style={styles.inline}>
            <Title>Type: </Title>
            <Txt>{TYPE}</Txt>
          </View>
        )}
        {!!EPISODE && (
          <View style={styles.inline}>
            <Title>Episode: </Title>
            <Txt>{EPISODE}</Txt>
          </View>
        )}
        {!!AIR_DATE && (
          <View style={styles.inline}>
            <Title>Air date: </Title>
            <Txt>{AIR_DATE}</Txt>
          </View>
        )}

        {REQUIRED_DATA?.[0].image !== null && (
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
    data: state.data,
    filter: state.filter,
    currentCard: state.currentCard,
  };
}

export default connect(mapStateToProps, { setRequiredDataAction })(
  DetailsScreen
);
