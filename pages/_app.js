import { Global, css, ThemeProvider } from "@emotion/react";
import { theme } from "../Theme";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { AppProvider } from "../context/AppContext";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const errorLink = onError(({ graphqlErrors, networkError }) => {
    if (graphqlErrors) {
      graphqlErrors.map(({ message, location, path }) =>
        alert(`Graphql error ${message}`)
      );
    }
  });

  const link = from([
    errorLink,
    new HttpLink({ uri: "https://graphql-pokeapi.vercel.app/api/graphql" }),
  ]);

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });

  useEffect(() => {
    const myPokemon = JSON.parse(localStorage.getItem("myPokemon"))
    if (!myPokemon) return localStorage.setItem("myPokemon", JSON.stringify([]))
  },[])

  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <ApolloProvider client={client}>
          <Global
            styles={css`
              @import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap");

              body {
                font-family: "Nunito Sans";
              }
              html {
                padding: 0px;
              }
            `}
          />
          <Component {...pageProps} />
        </ApolloProvider>
      </AppProvider>
    </ThemeProvider>
  );
}

export default MyApp;
