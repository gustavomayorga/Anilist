import {
  Button,
  Dialog,
  Portal,
  Provider,
  Text,
} from "react-native-paper";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import palleta from "../utils/Palleta";

export default function Caram({handleClick}) {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("Assistidos");

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const helperDialog = (lValue) => {
    setValue(lValue);
    handleClick(lValue);
    hideDialog();
  };
  return (
    <View style={{ height: 50, width: 120 }}>
      <Provider style={styles.dialogProvider}>
        <View>
          <Button
            mode="contained"
            textColor={palleta.textoCor}
            style={styles.buttonTeste}
            onPress={showDialog}
            icon="chevron-down"
            contentStyle={{ flexDirection: "row-reverse" }}
          >
            <Text style={{color: palleta.textoCor, fontSize: 14 }}>{value}</Text>
          </Button>
          <Portal>
            <Dialog
              style={styles.dialog}
              visible={visible}
              onDismiss={hideDialog}
            >
              <Dialog.Actions style={{ flexDirection: "column" }}>
                <Button
                  textColor={palleta.textoCor}
                  style={styles.buttonDialog}
                  onPress={() => helperDialog("Assistidos")}
                >
                  <Text style={styles.textoPadrao}>Assistidos</Text>
                </Button>

                <Button
                  textColor={palleta.textoCor}
                  style={styles.buttonDialog}
                  onPress={() => helperDialog("Favoritos")}
                >
                  <Text style={styles.textoPadrao}>Favoritos</Text>
                </Button>

                <Button
                  textColor={palleta.textoCor}
                  style={styles.buttonDialog}
                  onPress={() => helperDialog("Assistindo")}
                >
                  <Text style={styles.textoPadrao}>Assistindo</Text>
                </Button>

                <Button
                  textColor={palleta.textoCor}
                  style={styles.buttonDialog}
                  onPress={() => helperDialog("Dropado")}
                >
                  <Text style={styles.textoPadrao}>Dropado</Text>
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </Provider>
    </View>
  );
}
const styles = StyleSheet.create({
  buttonTeste: {
    backgroundColor: palleta.inputCor,
    borderRadius: palleta.borderPadrao,

    width: 120,
    height: 40,
  },
  buttonDialog: {
    width: 150,
    height: 50,
  },
  textoPadrao: {
    color: palleta.textoCor,
    fontSize: 20,
  },
  dialog: {
    position: "absolute",
    alignSelf: "center",
    width: 200,
    backgroundColor: palleta.backgroundCor,
    borderColor: palleta.borderColor,
    borderWidth: 1,
    borderRadius: palleta.borderPadrao,
  },
});
