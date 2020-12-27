import React, { FC } from "react";
import { StatusBar } from "react-native";
import Toast from "react-native-toast-message";

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
      <Toast ref={ref => Toast.setRef(ref)} />
    </>
  );
};

export default App;
