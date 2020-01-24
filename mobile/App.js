import React from "react";
import { StatusBar } from "react-native";

import { ApolloProvider } from "@apollo/react-hooks";

import client from "./src/services/AppoloClient";

import Routes from "./src/routes";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <StatusBar barStyle="light-content" backgroundColor="#7d40e7" />
      <Routes />
    </ApolloProvider>
  );
}
