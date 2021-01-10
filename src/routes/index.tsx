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
              options={{
                headerShown: true,
                headerTitleAlign: "center",
                headerTintColor: "#4d6e92",
                title: "Turmas"
              }}
            />
            <Drawer.Screen
              name="CreateGroupPage"
              component={CreateGroupPage}
              options={{
                headerShown: true,
                headerTitleAlign: "center",
                headerTintColor: "#4d6e92",
                title: "Criar Turma"
              }}
            />
            <Drawer.Screen
              name="LinkByCodePage"
              component={LinkByCodePage}
              options={{
                headerShown: true,
                headerTitleAlign: "center",
                headerTintColor: "#4d6e92",
                title: "participar de uma turma"
              }}
            />
            <Drawer.Screen
              name="DetailsGroupPage"
              component={DetailsGroupPage}
              options={{
                headerShown: true,
                headerTitleAlign: "center",
                headerTintColor: "#4d6e92",
                title: "Informações da Turma"
              }}
            />
            <Drawer.Screen
              name="LinkByEmailPage"
              component={LinkByEmailPage}
              options={{
                headerShown: true,
                headerTitleAlign: "center",
                headerTintColor: "#4d6e92",
                title: "Vincular aluno"
              }}
            />
            <Drawer.Screen
              name="CreateActivityPage"
              component={CreateActivityPage}
              options={{
                headerShown: true,
                headerTitleAlign: "center",
                headerTintColor: "#4d6e92",
                title: "Criar Atividade"
              }}
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
