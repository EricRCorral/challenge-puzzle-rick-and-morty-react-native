import React from "react";
import { View, Image, ScrollView, ImageBackground } from "react-native";
import { Container, Title, Cards, Txt } from "../../components";
import { connect } from "react-redux";
import { Response as CharactersResponse } from "../../apollo/queries/queryCharacters";
import { Response as EpisodesResponse } from "../../apollo/queries/queryEpisodes";
import { Response as LocationsResponse } from "../../apollo/queries/queryLocations";
import styles from "./styles";
import { DETAILS_BACKGROUND } from "../../assets/images";

interface State {
  data: CharactersResponse | EpisodesResponse | LocationsResponse;
  filter: string;
  currentCard: number;
}

const DetailsScreen = ({ data, filter, currentCard }: State) => {
  const RESULTS =
    filter === "characters"
      ? data.characters?.results[currentCard]
      : filter === "locations"
      ? data.locations?.results[currentCard]
      : data.episodes?.results[currentCard];

  const REQUIRED_DATA =
    filter === "locations" ? RESULTS?.residents : RESULTS?.characters;

  const IMAGE = RESULTS?.image;
  const NAME = RESULTS?.name;
  const GENDER = RESULTS?.gender;
  const SPECIES = RESULTS?.species;
  const TYPE = RESULTS?.type;
  const DIMENSION = RESULTS?.dimension;
  const EPISODE = RESULTS?.episode;
  const AIR_DATE = RESULTS?.air_date;

  const CardDetails = () => {
    if (filter === "characters") {
      return (
        <>
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
        </>
      );
    } else {
      return (
        <>
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
        </>
      );
    }
  };

  return (
    <ImageBackground source={DETAILS_BACKGROUND} style={styles.backgroundImage}>
      <Container>
        <ScrollView>
          <CardDetails />
        </ScrollView>
      </Container>
    </ImageBackground>
  );
};

function mapStateToProps(state: State) {
  return {
    data: state.data,
    filter: state.filter,
    currentCard: state.currentCard,
  };
}

export default connect(mapStateToProps)(DetailsScreen);
