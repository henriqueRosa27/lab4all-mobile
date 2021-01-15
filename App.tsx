import React, { FC } from "react";
import { StatusBar } from "react-native";
import Toast from "react-native-toast-message";
import { Provider as PaperProvider } from "react-native-paper";

import Routes from "./src/routes";
import AppProvider from "./src/hooks";
import theme from "./theme";

const App: FC = () => {
  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />

      <AppProvider>
        <PaperProvider theme={theme}>
          <Routes />
        </PaperProvider>
      </AppProvider>
      <Toast ref={ref => Toast.setRef(ref)} />
    </>
  );
};

export default App;
