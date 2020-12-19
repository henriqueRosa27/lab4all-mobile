import React, { FC } from "react";
import {
  ScrollView,
  TextInput,
  Image,
  Text,
  View,
  ActivityIndicator
} from "react-native";

import { ButtonComponent } from "../../components";
import { useAuth } from "../../hooks/AuthContext";
import Logo from "../../assets/logo.png";
import styles from "./styles";

const App: FC = () => {
  const { signIn, loading } = useAuth();
  const _calldata = async () => {
    const data = { email: "t@t.com", password: "12345678" };
    await signIn(data);
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
          editable={!loading}
        />
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          autoCompleteType="password"
          secureTextEntry={true}
          editable={!loading}
        />
        <ButtonComponent onPress={_calldata}>
          {loading ? (
            <ActivityIndicator color="#fff" size="large" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </ButtonComponent>
      </ScrollView>
    </>
  );
};

export default App;
