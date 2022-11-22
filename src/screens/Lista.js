import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { useEffect, useState } from "react";

import palleta from "../utils/Palleta";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList } from "react-native-gesture-handler";

const Anime = ({titulo ,genero, avaliacao }) => (
  <View style={styles.card}>
    <View style={styles.image}>
      <Image
        style={styles.tinyLogo}
        source={require("../../assets/images/defaultAnime.jpg")}
      />
      <View style={styles.descricao}>
        <Text style={styles.titulo}>{titulo}</Text>
        <Text style={styles.textoPadrao}>Gêneros: {genero} </Text>
        <Text style={styles.textoPadrao}>Sua avaliação: {avaliacao}</Text>
      </View>
    </View>
  </View>
);

export default function Lista({ listaName = "Assistidos" }) {
  const [anilist, setAnilist] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const value = await AsyncStorage.getItem(listaName);

    if (value != null) {
      setAnilist(JSON.parse(value));
    } else {
      console.log(anilist);
    }
    console.log(value);
  };
  const lAnime = ({ item }) => (
    <Anime titulo={item.titulo} genero={item.genero} avaliacao={item.avaliacao} />
  )


  return (
    <View style={styles.body}>
      <ScrollView nestedScrollEnabled={true} style={styles.scrollView}>
        <View>
          <ScrollView horizontal={true} style={{width: "100%"}} >
            <FlatList
              data={anilist}
              renderItem={lAnime}
              keyExtractor={(anilist) => anilist.id}
            />
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: 100,
    height: 140,
    borderRadius: palleta.borderPadrao,
  },
  card: {
    width: 370,
    padding: 12,
    height: 165,
    backgroundColor: palleta.backgroundCor,
    borderRadius: palleta.borderPadrao,
    marginTop: 15,
    display: "flex",
  },
  image: {
    flexDirection: "row",
    height: 200,
  },
  descricao: {
    width: "65%",
    alignItems: "center",
  },
  titulo: {
    color: palleta.textoCor,
    fontSize: 16,
    marginBottom: 25,
  },
  textoPadrao: {
    color: palleta.textoCor,
    fontSize: 16,
    marginBottom: 15,
    marginLeft: 15,
    alignSelf: "flex-start",
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palleta.backgroundCorBody,
  },
  scrollView: {
    
    width: "93%",
  },
  text: {
    fontSize: 42,
    color: "white",
  },
});
