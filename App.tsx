import React, { FC } from "react";
import { StatusBar } from "react-native";
import { SigninPage } from "./src/pages";
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
        <SigninPage />
      </AppProvider>
    </>
  );
};

export default App;
