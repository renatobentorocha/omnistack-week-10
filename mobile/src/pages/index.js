import React, { useEffect, useState, useMemo } from "react";

import { useLazyQuery } from "@apollo/react-hooks";

import { MaterialIcons } from "@expo/vector-icons";

import {
  requestPermissionsAsync,
  getCurrentPositionAsync
} from "expo-location";

import { SEARCH_DEV, DEV_ADDED } from "../gql/dev";
import Map from "./Map";

import { SearchForm, SearchInput, LoadButton } from "./styles";

function Main({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null);
  const [techs, setTechs] = useState("");
  const [techsForSubscription, setTechsForSubscription] = useState("");

  const [
    getDevs,
    { subscribeToMore, data: { searchDevs = [] } = [] }
  ] = useLazyQuery(SEARCH_DEV);

  const more = () =>
    subscribeToMore({
      document: DEV_ADDED,
      variables: {
        devTechs: {
          techs: techsForSubscription,
          latitude: `${currentRegion.latitude}`,
          longitude: `${currentRegion.longitude}`
        }
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data.devAdded) return prev;

        const newFeedItem = subscriptionData.data.devAdded;

        return Object.assign({}, prev, {
          searchDevs: [newFeedItem, ...prev.searchDevs]
        });
      }
    });

  useEffect(() => {
    async function loadIntialPosition() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04
        });
      }
    }

    loadIntialPosition();
  }, []);

  useEffect(() => {
    if (techsForSubscription) more();
  }, [techsForSubscription]);

  function handleRegionChanged(region) {
    setCurrentRegion(region);
  }

  async function loadDevs() {
    const { latitude, longitude } = currentRegion;

    getDevs({
      variables: {
        filter: {
          techs,
          latitude,
          longitude
        }
      }
    });

    setTechsForSubscription(techs);
  }

  const memoizedMap = useMemo(
    () =>
      currentRegion ? (
        <Map
          navigation={navigation}
          devs={searchDevs}
          techs={techsForSubscription}
          currentRegion={currentRegion}
          handleRegionChanged={handleRegionChanged}
        />
      ) : null,
    [searchDevs]
  );
  return (
    <>
      {memoizedMap}
      <SearchForm>
        <SearchInput
          placeholder="Buscar devs por techs"
          placeholderTextColor="#666"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={text => setTechs(text)}
        />
        <LoadButton onPress={() => loadDevs()}>
          <MaterialIcons
            name="my-location"
            size={20}
            color="#fff"
          ></MaterialIcons>
        </LoadButton>
      </SearchForm>
    </>
  );
}

export default Main;
