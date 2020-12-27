import React, { FC, useEffect } from "react";
import { View, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useIsFocused } from "@react-navigation/native";

import { List } from "./components";
import { useListGroup } from "../../hooks/ListGroupContext";

import styles from "./styles";

const GroupList: FC = () => {
  const { data, loadData, loading } = useListGroup();
  const navigation = useNavigation();

  useEffect(() => {
    loadData();
  }, []);

  const isFocused = useIsFocused();
  useEffect(() => {
    loadData();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Ionicons name="people" color="#4d6e92" size={50} />
      </View>
      <Text style={styles.title}>Turmas</Text>
      <Text style={[styles.description, styles.limitWidth]}>
        Aqui você pode acompanhar as turmas que você ministra ou está vinculado,
        assim como acessar detalhes e executar ações!
      </Text>
      <View>
        <Text
          style={styles.createAction}
          onPress={() => {
            navigation.navigate("LinkByCodePage");
          }}>
          Se vincular a muma turma
        </Text>
        <Text
          style={styles.createAction}
          onPress={() => {
            navigation.navigate("CreateGroupPage");
          }}>
          Criar nova turma
        </Text>
      </View>
      <List data={data} loading={loading} />
    </View>
  );
};

export default GroupList;
