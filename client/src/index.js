import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { cache } from "./cache";
import { token } from "./state/User";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/"
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const loadToken = token();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: loadToken ? `Bearer ${loadToken}` : ""
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
