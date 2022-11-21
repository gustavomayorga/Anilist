import { View, Text, StyleSheet } from "react-native";
import palleta from "../utils/Palleta";
import { RadioButton, TextInput, Button } from "react-native-paper";
import { useEffect, useState } from "react";

import Caram from "../components/Caram";

export default function CriarItem({ navigation, route }) {
  const [value, setValue] = useState("first");
  const [testva, setTest] = useState(false);
  return (
    <View style={styles.body}>
      <View style={styles.card}>
        <Text>Lista</Text>
        <Caram test={testva} ></Caram>
        
        <View style={styles.ViewInputs}>
          <Text style={{ zIndex: -1 }}>Nome</Text>
          <TextInput style={styles.TextInput}></TextInput>
        </View>
        <View style={styles.ViewInputs}>
          <Text style={{ zIndex: -1 }}>Gêneros</Text>
          <TextInput style={styles.TextInput}></TextInput>
        </View>
        <View style={styles.ViewInputs}>
          <Text style={{ zIndex: -1 }}>Avaliação</Text>
          <TextInput style={styles.TextInput}></TextInput>
        </View>
        <View style={styles.ViewInputs}>
          <Text style={{ zIndex: -1 }}>Capa</Text>
          <TextInput style={styles.TextInput}></TextInput>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonTeste: {
    backgroundColor: "black",
    width: 200,
    height: 40,
  },
  ViewInputs: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: '80%',
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
});
