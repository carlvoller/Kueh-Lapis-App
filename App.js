import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BlockRGB from "./components/BlockRGB";
import { FlatList } from "react-native-gesture-handler";

function HomeScreen({ navigation }) {
  const [colorArray, setColorArray] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={addColor} title="Add colour" />,
    });
  });

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Details", {
            ...item, // spreading the object
          });
        }}
      >
        <BlockRGB red={item.red} green={item.green} blue={item.blue} />
      </TouchableOpacity>
    );
  }

  function addColor() {
    setColorArray([
      {
        red: Math.floor(Math.random() * 256),
        green: Math.floor(Math.random() * 256),
        blue: Math.floor(Math.random() * 256),
        id: `${colorArray.length}`,
      },
      ...colorArray, // spreading the array
    ]);
    console.log(colorArray);
  }

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity
        style={{ height: 40, justifyContent: "center" }}
        onPress={addColor}
      >
        <Text>Add colour</Text>
      </TouchableOpacity> */}
      <FlatList style={styles.list} data={colorArray} renderItem={renderItem} />
    </View>
  );
}

function DetailsScreen({ route }) {
  // destructuring
  const { red, green, blue } = route.params;

  return (
    <View
      style={[
        styles.detailsContainer,
        {
          backgroundColor: `rgb(${red}, ${green}, ${blue})`,
        },
      ]}
    >
      <Text style={styles.detailsText}>Red: {red}</Text>
      <Text style={styles.detailsText}>Green: {green}</Text>
      <Text style={styles.detailsText}>Blue: {blue}</Text>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  detailsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  detailsText: {
    fontSize: 30,
  },
});
