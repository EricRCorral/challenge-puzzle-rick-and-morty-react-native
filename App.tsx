import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { StatusBar } from "expo-status-bar";
import { StartScreen, SearchScreen, DetailsScreen } from "./screens";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { generateStore } from "./store";

let store = generateStore();

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

const Stack = createStackNavigator();

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Start"
              component={StartScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Search"
              component={SearchScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Details"
              component={DetailsScreen}
              options={{ headerTitleAlign: "center" }}
            />
          </Stack.Navigator>
          <StatusBar hidden={true} />
        </NavigationContainer>
      </Provider>
    </ApolloProvider>
  );
};

export default App;
