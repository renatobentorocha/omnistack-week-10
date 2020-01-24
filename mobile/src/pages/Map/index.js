import React from "react";
import { Marker, Callout } from "react-native-maps";

import {
  Container,
  TMapView,
  Avatar,
  CalloutContainer,
  DevName,
  DevBio,
  DevTechs
} from "./styles";

function Map({ navigation, devs, handleRegionChanged, currentRegion }) {
  if (!currentRegion) return null;

  return (
    <Container>
      <TMapView
        onRegionChangeComplete={handleRegionChanged}
        initialRegion={currentRegion}
      >
        {devs.map(dev => (
          <Marker
            key={dev._id}
            coordinate={{
              latitude: dev.location.coordinates[0],
              longitude: dev.location.coordinates[1]
            }}
          >
            <Avatar source={{ uri: dev.avatar_url }} />
            <Callout
              onPress={() =>
                navigation.navigate("Profile", {
                  github_username: dev.github_username
                })
              }
            >
              <CalloutContainer>
                <DevName>{dev.name}</DevName>
                <DevBio>{dev.bio}</DevBio>
                <DevTechs>{dev.techs.join(", ")}</DevTechs>
              </CalloutContainer>
            </Callout>
          </Marker>
        ))}
      </TMapView>
    </Container>
  );
}

export default Map;
