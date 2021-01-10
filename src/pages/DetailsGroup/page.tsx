import React, { FC, useEffect } from "react";
import { View, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRoute, useIsFocused } from "@react-navigation/native";
import Clipboard from "@react-native-community/clipboard";

import styles from "./styles";
import { ButtonsDetailsGroup, ListActivities } from "./components";
import { useDetailsGroup } from "../../hooks/DetailsGroupContext";
import { useAuth } from "../../hooks/AuthContext";
import Toast from "react-native-toast-message";

interface DetailsGroupRouteParams {
  id: string;
}

const DetailsGroup: FC = () => {
  const route = useRoute();
  const params = route.params as DetailsGroupRouteParams;
  const { loadData, groupData, loading } = useDetailsGroup();
  const { user } = useAuth();

  const { id } = params;

  useEffect(() => {
    loadData(id);
  }, []);

  const isFocused = useIsFocused();
  useEffect(() => {
    loadData(id);
  }, [isFocused]);

  const _copyCode = () => {
    Clipboard.setString("hello world");
    Toast.show({
      type: "success",
      text1: "Código copiado!",
      position: "bottom"
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Ionicons name="md-people" color="#4d6e92" size={50} />
      </View>
      {!loading && (
        <>
          <Text style={styles.title}>{groupData.name}</Text>
          <Text style={styles.code}>
            Código:
            <Text> </Text>
            <Text style={styles.codeCopy} onPress={_copyCode}>
              {groupData.code}
              <Ionicons name="copy-outline" size={15} color="#4d6e92" />
            </Text>
          </Text>
          <Text style={[styles.description, styles.limitWidth]}>
            {groupData.description}
          </Text>
        </>
      )}
      {!loading && user.id === groupData.teacher?.id && <ButtonsDetailsGroup />}
      <ListActivities />
    </View>
  );
};

export default DetailsGroup;
