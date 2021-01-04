import React, { FC, useEffect } from "react";
import { View, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRoute, useIsFocused } from "@react-navigation/native";

import styles from "./styles";
import { ButtonsDetailsGroup, ListActivities } from "./components";
import { useDetailsGroup } from "../../hooks/DetailsGroupContext";
import { useAuth } from "../../hooks/AuthContext";

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

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Ionicons name="md-people" color="#4d6e92" size={50} />
      </View>
      {!loading && (
        <>
          <Text style={styles.title}>{groupData.name}</Text>
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
