import React from "react";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";

import DevForm from "./components/DevForm";
import DevItem from "./components/DevItem";

import "./global.css";
import "./app.css";
import "./sidebar.css";
import "./main.css";

const QUERY_DEV = gql`
  query {
    devs {
      _id
      name
      github_username
      bio
      avatar_url
      techs
    }
  }
`;

const ADD_DEV = gql`
  mutation save($dev: DevInput) {
    saveDev(input: $dev) {
      _id
      name
      github_username
      bio
      avatar_url
      techs
      location {
        id
        coordinates
        type
      }
    }
  }
`;

function App() {
  const { data } = useQuery(QUERY_DEV);

  const [addDev, { loading }] = useMutation(ADD_DEV, {
    onError: error => console.error(error),
    update: (cache, { data: { saveDev } }) => {
      const { devs } = cache.readQuery({ query: QUERY_DEV });

      cache.writeQuery({
        query: QUERY_DEV,
        data: { devs: devs.concat([saveDev]) }
      });
    }
  });

  async function handleAddDev({ github_username, techs, latitude, longitude }) {
    await addDev({
      variables: { dev: { github_username, techs, latitude, longitude } }
    });
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} loading={loading} />
      </aside>
      <main>
        <ul>
          {data && data.devs.map(dev => <DevItem key={dev._id} dev={dev} />)}
        </ul>
      </main>
    </div>
  );
}

export default App;
