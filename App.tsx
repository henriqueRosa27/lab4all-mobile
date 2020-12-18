import React, { FC } from "react";
import { StatusBar } from "react-native";
import { SigninPage } from "./src/pages";

const App: FC = () => {
  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />
      <SigninPage />
    </>
  );
};

export default App;
