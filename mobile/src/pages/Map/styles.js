import styled from "styled-components/native";
import MapView from "react-native-maps";
import { Dimensions, Image } from "react-native";

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

export const TMapView = styled(MapView)`
  width: ${Dimensions.get("window").width}px;
  height: ${Dimensions.get("window").height}px;
`;

export const Avatar = styled.Image`
  height: 54px;
  width: 54px;
  border-radius: 4px;
  border-width: 4px;
  border-color: #fff;
`;

export const CalloutContainer = styled.View`
  width: 260px;
`;

export const DevName = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;

export const DevBio = styled.Text`
  color: #666;
  margin-top: 5px;
`;

export const DevTechs = styled.Text`
  margin-top: 5px;
`;
