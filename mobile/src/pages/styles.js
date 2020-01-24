import styled from "styled-components/native";

export const SearchForm = styled.View`
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  z-index: 5;
  flex-direction: row;
`;

export const SearchInput = styled.TextInput.attrs({
  paddingHorizontal: 20,
  // Sombra IOS
  shadowColor: "#000",
  shadowOpacity: 0.2,
  shadowOffset: {
    height: 4,
    width: 4
  },
  // Sombra ANDROID
  elevation: 2
})`
  flex: 1;
  height: 50px;
  background-color: #fff;
  color: #333;
  border-radius: 25px;
  font-size: 16px;
`;

export const LoadButton = styled.TouchableOpacity`
  height: 50px;
  width: 50px;
  background-color: #8d4eff;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  margin-left: 15px;
`;
