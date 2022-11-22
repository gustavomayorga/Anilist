import { View, Text, StyleSheet } from "react-native";
import palleta from "../utils/Palleta";
import { RadioButton, TextInput, Button } from "react-native-paper";
import { useEffect, useState } from "react";

import Caram from "../components/Caram";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CriarItem({ navigation, route }) {
  const [lista, setLista] = useState("Assistidos");
  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [avaliacao, setAvaliacao] = useState("");
  const [anilist, setAnilist] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getData();
  }, [lista]);

  const onPressHandler = async () => {
    console.log("oi")
      try {
        await AsyncStorage.setItem(lista, JSON.stringify([
          ...anilist,
          { id: Math.floor(Math.random() * 1000) ,titulo: titulo, genero: genero, avaliacao: avaliacao },
        ]));
        navigation.goBack();
      } catch (error) {
        setError(true);
      }
     // Só pode string no async storage, então passar para o json stringfy pesquisa na internte array em asyncstorage
  };
  const getData = async () => {
    const value = await AsyncStorage.getItem(lista);

    if (value != null) {
      setAnilist(JSON.parse(value));
    } else {
      console.log(anilist)
    }
    console.log(value);
  };

  const handleClick = (valor) => {
    setLista(valor);
  };

  return (
    <View style={styles.body}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Lista</Text>
        <Caram handleClick={handleClick}></Caram>

        <View style={styles.ViewInputs}>
          <Text style={styles.textoPadrao}>Título</Text>
          <TextInput
            style={styles.TextInput}
            activeUnderlineColor={palleta.primary}
            onChangeText={(value) => setTitulo(value)}
            textColor={palleta.textoCor}
          ></TextInput>
        </View>
        <View style={styles.ViewInputs}>
          <Text style={styles.textoPadrao}>Gêneros</Text>
          <TextInput
            onChangeText={(value) => setGenero(value)}
            style={styles.TextInput}
            activeUnderlineColor={palleta.primary}
            textColor={palleta.textoCor}
          ></TextInput>
        </View>
        <View style={styles.ViewInputs}>
          <Text style={styles.textoPadrao}>Avaliação</Text>
          <TextInput
            onChangeText={(value) => setAvaliacao(value)}
            style={styles.TextInput}
            activeUnderlineColor={palleta.primary}
            textColor={palleta.textoCor}
          ></TextInput>
        </View>
        <View style={styles.ViewInputs}>
          <Text style={styles.textoPadrao}>Capa</Text>
          <TextInput
            style={styles.TextInput}
            activeUnderlineColor={palleta.primary}
            textColor={palleta.textoCor}
            right={<TextInput.Icon icon="upload" />}
            disabled={true}
          ></TextInput>
        </View>
        <Button textColor={palleta.textoCor} onPress={onPressHandler} style={styles.buttonLista} >Salvar Lista</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonLista: {
    backgroundColor: palleta.primary,
    marginTop: 20,
    borderRadius: palleta.borderPadrao
  },
  buttonTeste: {
    backgroundColor: "black",
    width: 200,
    height: 40,
  },
  ViewInputs: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 8,
  },
  TextInput: {
    height: 40,
    width: 200,
    zIndex: -1,
    backgroundColor: palleta.inputCor,
    borderRadius: palleta.borderPadrao,
  },
  picker: {
    width: 150,
    backgroundColor: palleta.backgroundCorBody,
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palleta.backgroundCorBody,
  },
  card: {
    paddingTop: 30,
    paddingBottom: 30,
    display: "flex",
    width: "90%",
    borderRadius: palleta.borderPadrao,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palleta.backgroundCor,
  },
  titulo: {
    color: palleta.textoCor,
    fontSize: 18,
    marginBottom: 5,
  },
  textoPadrao: {
    color: palleta.textoCor,
    fontSize: 15,
    zIndex: -1,
  },
});
