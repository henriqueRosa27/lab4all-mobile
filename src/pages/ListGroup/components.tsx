import React, { FC } from "react";
import {
  View,
  Text,
  GestureResponderEvent,
  ActivityIndicator
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import { useAuth } from "../../hooks/AuthContext";
import { GroupModel } from "../../models";

import styles from "./styles";

interface ListProps {
  data: GroupModel[];
  loading: boolean;
}

interface CardListProps {
  name: string;
  description: string;
  code: string;
  isTeacher: boolean;
  teacherName: string;
  onPress: (event: GestureResponderEvent) => void;
}

const List: FC<ListProps> = ({ data, loading }: ListProps) => {
  const { user } = useAuth();
  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator color="#000" size="large" />
      ) : (
        <ScrollView>
          {data.map(group => {
            const isTeacher = user.id === group.teacher.id;
            return (
              <CardList
                key={group.id}
                name={group.name}
                description={group.description}
                code={group.code}
                isTeacher={isTeacher}
                teacherName={group.teacher.name}
                onPress={() => {
                  console.log("teste" + group.id);
                }}
              />
            );
          })}
        </ScrollView>
      )}
    </ScrollView>
  );
};

const CardList: FC<CardListProps> = ({
  name,
  description,
  code,
  isTeacher,
  teacherName,
  onPress
}: CardListProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.status}>
        <Ionicons name="md-people" color="#4d6e92" size={30} />
      </View>
      <View style={styles.content}>
        <Text style={styles.titleCard}>{name}</Text>
        {isTeacher ? (
          <Text style={styles.code}>{code}</Text>
        ) : (
          <Text style={styles.code}>{teacherName}</Text>
        )}
        <Text style={styles.descriptionCard}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export { CardList, List };
