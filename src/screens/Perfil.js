import { View, Text, StyleSheet, Button } from "react-native";
import { Avatar, IconButton, TextInput } from "react-native-paper";
import { useEffect, useState } from "react";

import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

import palleta from "../utils/Palleta";
import CriarItem from "./CriarItem";
import Lista from "./Lista";

const ItemNavigation = ({ iconName, qtdLista, nomeLista, proxPagina }) => {
  return (
    <View style={styles.itensNavigation}>
      <View style={styles.teste}>
        <Avatar.Icon size={40} icon={iconName} style={styles.icones} />
        <Text style={styles.textoPadrao}> {qtdLista} </Text>
        <Text style={styles.textoPadrao}> {nomeLista} </Text>
      </View>
      <IconButton
        icon="chevron-right"
        size={30}
        onPress={proxPagina}
        style={styles.iconesButtons}
        iconColor={palleta.textoCor}
      />
    </View>
  );
};

const Menu = ({ navigation }) => {
  const [nickname, setNickname] = useState("");
  const [lengthListaAssistidos, setlengthListaAssistidos] = useState(0);

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
    const lengthListaAssistidos = await AsyncStorage.getItem("Assistidos");
    if (value != null) {
      setNickname(value);
    } else {
      setNickname("vazio");
    }
    if (lengthListaAssistidos != null) {
      setlengthListaAssistidos(JSON.parse(lengthListaAssistidos).length);
    } else {
      console.log("null lista");
    }
    console.log("terminou");
  };

  const onPressHandler = () => {
    navigation.push("Criar_Item");
  };

  pressHandler = () => {
    navigation.navigate("Lista");
  };
  return (
    <View style={styles.body}>
      <View style={styles.card}>
        <Avatar.Image
          style={styles.imagens}
          size={150}
          source={require("../../assets/images/Tenshi.webp")}
        />
        <Text style={styles.titulo}>{nickname}</Text>
        <View style={styles.cardNavigation}>
          <ItemNavigation
            iconName="eye"
            qtdLista={lengthListaAssistidos}
            nomeLista="Assistidos"
            proxPagina={pressHandler}
          ></ItemNavigation>
          <ItemNavigation
            iconName="heart"
            qtdLista={0}
            nomeLista="Favoritos"
          ></ItemNavigation>
          <ItemNavigation
            iconName="format-list-bulleted"
            qtdLista={0}
            nomeLista="Lista"
          ></ItemNavigation>
          <ItemNavigation
            iconName="delete"
            qtdLista={0}
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
          // headerRight: () => (
          //   <IconButton
          //     icon="check"
          //     iconColor={palleta.textoCor}
          //     onPress={() => navigation.goBack()}
          //     disabled={true}
          //   />
          // ),
        }}
      />
      <Stack.Screen name="Lista" component={Lista} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  titulo: {
    color: palleta.textoCor,
    fontSize: 20,
    marginTop: 5,
  },
  textoPadrao: {
    color: palleta.textoCor,
    fontSize: 15,
  },
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
    top: "4%",
    backgroundColor: palleta.primary,
  },
});
