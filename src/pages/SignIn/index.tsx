import React, { FC } from "react";
import { ScrollView, TextInput, Image, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";

import { signIn } from "../../services/sessionService";
import Logo from "../../assets/logo.png";
import styles from "./styles";

const App: FC = () => {
  const _calldata = async () => {
    try {
      console.log("antes de chamar api");
      const data = await signIn({ email: "t@t.com", password: "12345678" });
      console.log("depois de chamar api");
      console.log(data);
    } catch (e) {
      console.log("erro ao chamar api");
      console.log(e);
    }
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ padding: 24 }}>
        <View style={styles.imageContainer}>
          <Image source={Logo} style={styles.logo} />
        </View>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          autoCompleteType="email"
          keyboardType="email-address"
        />
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          autoCompleteType="password"
          secureTextEntry={true}
        />
        <RectButton style={styles.button} onPress={_calldata}>
          <Text style={styles.buttonText}>Login</Text>
        </RectButton>
      </ScrollView>
    </>
  );
};

export default App;
