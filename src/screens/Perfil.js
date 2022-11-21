import { View, Text, StyleSheet, Button } from "react-native";
import { Avatar, IconButton, TextInput } from "react-native-paper";
import { useEffect, useState } from "react";

import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

import palleta from "../utils/Palleta";
import CriarItem from "./CriarItem";

const ItemNavigation = ({ iconName, qtdLista, nomeLista, proxPagina }) => {
  return (
    <View style={styles.itensNavigation}>
      <View style={styles.teste}>
        <Avatar.Icon size={40} icon={iconName} style={styles.icones} />
        <Text> {qtdLista} </Text>
        <Text> {nomeLista} </Text>
      </View>
      <IconButton
        icon="chevron-right"
        size={30}
        onPress={proxPagina}
        style={styles.iconesButtons}
      />
    </View>
  );
};

const Menu = ({ navigation }) => {
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    getData();
    
  }, []);

  // const getData = () => {
  //   AsyncStorage.getItem("UserName")
  //     .then((value) => {
  //       if (value != null) {
  //         setNickname(value);
  //       } else {
  //         setNickname("vazio");
  //       }
  //     })
  //     .catch((error) => console.log(error));
  // };

  const getData = async () => {
    const value = await AsyncStorage.getItem("UserName");
    if (value != null) {
      setNickname(value);
    } else {
      setNickname("vazio");
    };
    console.log("terminou");
  };

  const onPressHandler = () => {
    navigation.push("Criar_Item");
  };

  pressHandler = () => {
    navigation.navigate("Teste");
  };
  return (
    <View style={styles.body}>
      <View style={styles.card}>
        <Avatar.Image
          style={styles.imagens}
          size={150}
          source={require("../../assets/images/Tenshi.webp")}
        />
        <Text>{nickname}</Text>
        <View style={styles.cardNavigation}>
          <ItemNavigation
            iconName="eye"
            qtdLista={329}
            nomeLista="Assistidos"
            proxPagina={pressHandler}
          ></ItemNavigation>
          <ItemNavigation
            iconName="heart"
            qtdLista={12}
            nomeLista="Favoritos"
          ></ItemNavigation>
          <ItemNavigation
            iconName="format-list-bulleted"
            qtdLista={14}
            nomeLista="Lista"
          ></ItemNavigation>
          <ItemNavigation
            iconName="delete"
            qtdLista={2}
            nomeLista="Drop"
          ></ItemNavigation>
        </View>
      </View>
      <IconButton
        icon="plus"
        iconColor={palleta.textoCor}
        size={palleta.sizeIconsButtons}
        style={styles.iconButton}
        onPress={onPressHandler}
      ></IconButton>
    </View>
  );
};

const Teste = () => {
  return (
    <View>
      <Text>TESTE</Text>
    </View>
  );
};

export default function Perfil({ navigation, route }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: "screen",
        gestureDirection: "horizontal",
        headerTitleAlign: "center",
        headerTintColor: palleta.textoCor,
        headerStyle: {
          borderBottomWidth: 0,
          backgroundColor: palleta.backgroundCor,
        },
      }}
    >
      <Stack.Screen
        name="Menu"
        component={Menu}
        options={{
          title: "Perfil",
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="Criar_Item"
        component={CriarItem}
        options={{
          title: null,
          headerLeft: () => (
            <IconButton
              icon="close"
              iconColor={palleta.textoCor}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => (
            <IconButton
              icon="check"
              iconColor={palleta.textoCor}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
      <Stack.Screen name="Teste" component={Teste} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingTop: 30,
    paddingBottom: 30,
    width: "90%",
    borderRadius: palleta.borderPadrao,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palleta.backgroundCor,
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palleta.backgroundCorBody,
  },
  imagens: {
    backgroundColor: palleta.backgroundCor,
  },
  cardNavigation: {
    backgroundColor: palleta.inputCor,
    borderRadius: 5,
    width: "85%",
    marginTop: 60,
  },
  itensNavigation: {
    flexDirection: "row",

    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
    borderBottomWidth: 0.5,
    borderColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 5,
  },
  icones: {
    backgroundColor: "transparent",
  },
  teste: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    top: "5%",
    backgroundColor: palleta.primary,
  },
});
