import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useAuth } from "../hooks/AuthContext";
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
import { DrawerComponent } from "../components";

const Drawer = createDrawerNavigator();

const Routes: FC = () => {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="SignInPage"
        drawerContent={props => <DrawerComponent {...props} />}>
        {user ? (
          <>
            <Drawer.Screen
              name="ListGroupPage"
              component={ListGroupPage}
              options={{ headerShown: true }}
            />
            <Drawer.Screen
              name="CreateGroupPage"
              component={CreateGroupPage}
              options={{ headerShown: false }}
            />
            <Drawer.Screen
              name="LinkByCodePage"
              component={LinkByCodePage}
              options={{ headerShown: false }}
            />
            <Drawer.Screen
              name="DetailsGroupPage"
              component={DetailsGroupPage}
              options={{ headerShown: false }}
            />
            <Drawer.Screen
              name="LinkByEmailPage"
              component={LinkByEmailPage}
              options={{ headerShown: false }}
            />
            <Drawer.Screen
              name="CreateActivityPage"
              component={CreateActivityPage}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Drawer.Screen
              name="SignInPage"
              component={SignInPage}
              options={{ headerShown: false }}
            />
            <Drawer.Screen
              name="SignUpPage"
              component={SignUpPage}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
