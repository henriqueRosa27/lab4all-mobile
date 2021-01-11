import React, { FC } from "react";
import { View } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import { Title, Caption, Drawer as DrawerPaper } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";

import styles from "./styles";
import { useAuth } from "../../hooks/AuthContext";
import { Button, Paragraph, Dialog, Portal } from "react-native-paper";

const Drawer: FC = (props: any) => {
  const { user, signOut } = useAuth();
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const logout = () => {
    hideDialog();
    signOut();
    props.navigation.dispatch(DrawerActions.closeDrawer());
  };

  const dialog = () => (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Sair</Dialog.Title>
        <Dialog.Content>
          <Paragraph>Deseja fazer logout?</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Não</Button>
          <Button onPress={logout}>Sim</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Entypo name="user" color="#4d6e92" size={50} />
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title style={styles.title}>Olá {user?.name}</Title>
                <Caption style={styles.caption}>{user?.email}</Caption>
              </View>
            </View>
          </View>
          <DrawerPaper.Section>
            <DrawerItem
              icon={({ color, size }) => (
                <Ionicons name="people" color={color} size={size} />
              )}
              label="Turmas"
              onPress={() => {
                props.navigation.navigate("ListGroupPage");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Ionicons name="md-person-add" color={color} size={size} />
              )}
              label="Participar de uma turma"
              onPress={() => {
                props.navigation.navigate("LinkByCodePage");
              }}
            />
          </DrawerPaper.Section>
        </View>
      </DrawerContentScrollView>
      <DrawerPaper.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sair"
          onPress={showDialog}
        />
      </DrawerPaper.Section>
      {dialog()}
    </View>
  );
};

export default Drawer;
