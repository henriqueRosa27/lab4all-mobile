import React, { FC } from "react";
import { StatusBar } from "react-native";
import Routes from "./src/routes";
import AppProvider from "./src/hooks";

const App: FC = () => {
  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />
      <AppProvider>
        <Routes />
      </AppProvider>
    </>
  );
};

export default App;
