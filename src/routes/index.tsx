import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";

import {
  SignInPage,
  SignUpPage,
  ListGroupPage,
  CreateGroupPage,
  LinkByCodePage,
  LinkByEmailPage,
  DetailsGroupPage,
  CreateActivityPage
} from "../pages";

const Stack = createStackNavigator();

const Routes: FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignInPage">
        <Stack.Screen
          name="SignInPage"
          component={SignInPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUpPage"
          component={SignUpPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ListGroupPage"
          component={ListGroupPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateGroupPage"
          component={CreateGroupPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LinkByCodePage"
          component={LinkByCodePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailsGroupPage"
          component={DetailsGroupPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LinkByEmailPage"
          component={LinkByEmailPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateActivityPage"
          component={CreateActivityPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
