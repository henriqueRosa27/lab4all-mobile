import React, { FC } from "react";
import { View, Text } from "react-native";

import styles from "./styles";

const ButtonsDetailsGroup: FC = () => {
  return (
    <View>
      <Text
        style={styles.createAction}
        onPress={() => {
          console.log("clicou vincular aluno");
        }}>
        Vincular aluno
      </Text>
      <Text
        style={styles.createAction}
        onPress={() => {
          console.log("clicou ciar atividade");
        }}>
        Criar nova Atividade
      </Text>
    </View>
  );
};

export { ButtonsDetailsGroup };
