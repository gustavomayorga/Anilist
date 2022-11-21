import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  IconButton,
  TextInput,
  HelperText,
} from "react-native-paper";

import AsyncStorage from "@react-native-async-storage/async-storage";

import palleta from "../utils/Palleta";



const Stack = createStackNavigator();

const Nickname = ({ navigation }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  const onPressHandler = async () => {
    if (name == "") {
      setError(true);
    } else {
      try {
        await AsyncStorage.setItem("UserName", name);
        navigation.navigate("FotoPerfil", { Usuario: name });
      } catch (error) {
        setError(true);
      }
    }
  };
  return (
    <View style={styles.body}>
      <View style={styles.card}>
        <Text style={styles.texto}>Apelido</Text>
        <TextInput
          error={error}
          style={styles.inputTexto}
          activeUnderlineColor={palleta.primary}
          textColor={palleta.textoCor}
          onChangeText={(value) => setName(value)}
        ></TextInput>
        <HelperText type="error" visible={error}>
          Nickname inválido
        </HelperText>
      </View>
      <IconButton
        style={styles.iconButton}
        icon="chevron-right"
        iconColor={palleta.textoCor}
        size={palleta.sizeIconsButtons}
        onPress={onPressHandler}
      />
    </View>
  );
};

const FotoPerfil = ({ navigation, route }) => {
  const { Usuario } = route.params;

  const onPressHandler = () => {
    navigation.goBack("Perfil", { Nickname: Usuario });
  };

  return (
    <View style={styles.body}>
      <View style={styles.card}>
        <Text style={styles.texto}>{Usuario}</Text>
        <TextInput
          style={styles.inputTexto}
          activeUnderlineColor={palleta.primary}
          textColor={palleta.textoCor}
          right={<TextInput.Icon icon="upload" iconColor={palleta.textoCor} />}
        ></TextInput>
      </View>
      <IconButton
        style={styles.iconButton}
        icon="chevron-right"
        iconColor={palleta.textoCor}
        size={palleta.sizeIconsButtons}
        onPress={onPressHandler}
      />
    </View>
  );
};

export default function Registro({ navigation, route }) {

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      
      AsyncStorage.getItem("UserName").then((value) => {
        console.log(value)
        if (value != null) {
          navigation.navigate("Perfil");
          
        }
      });
    } catch (error) {
      console.log(error);
    } 
  };


  return (
    <Stack.Navigator
      initialRouteName="Nickname"
      screenOptions={{
        headerMode: "screen",
        gestureDirection: "horizontal",
        title: "Registrar",
        headerTitleAlign: "center",
        headerTintColor: palleta.textoCor,
        headerStyle: {
          borderBottomWidth: 0,
          backgroundColor: palleta.backgroundCor,
        },
      }}
    >
      <Stack.Screen name="Nickname" component={Nickname} />
      <Stack.Screen name="FotoPerfil" component={FotoPerfil} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  SnackbarError: {
    zIndex: 1,
    alignItems: "center",
  },
  iconButtonBack: {
    backgroundColor: palleta.primary,
    position: "absolute",
    bottom: "5%",
    left: "5%",
  },
  iconButton: {
    backgroundColor: palleta.primary,

    position: "absolute",
    bottom: "5%",
    right: "5%",
  },
  inputTexto: {
    backgroundColor: palleta.inputCor,
    borderRadius: palleta.borderPadrao,
    tintColor: palleta.textoCor,
    width: "60%",
    textAlign: "center",
    height: 40,
  },
  texto: {
    fontSize: palleta.fontSizeRegistros,
    color: palleta.textoCor,
    marginBottom: 12,
  },
  card: {
    height: 180,
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
});
