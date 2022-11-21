import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect ,useState} from "react";


import AsyncStorage from "@react-native-async-storage/async-storage";

import Registro from "./src/screens/Registro";
import Perfil from "./src/screens/Perfil";

import palleta from "./src/utils/Palleta";

const Stack = createStackNavigator();

export default function App() {

  
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Registro"
        screenOptions={{
          headerTintColor: palleta.textoCor,
          headerTitleAlign: "center",

          headerStyle: {
            borderBottomWidth: 0,
            backgroundColor: palleta.backgroundCor,
          },
        }}
      >
        <Stack.Screen
          name="Registro"
          component={Registro}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Perfil"
          component={Perfil}
          options={{
            headerShown: false,
            headerLeft: () => null,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
