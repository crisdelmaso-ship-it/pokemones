import { View, Text, StyleSheet, useWindowDimensions } from "react-native";

export default function HomeScreen() {

  const { width } = useWindowDimensions();

  const columns =
    width > 600
      ? 3
      : width > 380
      ? 2
      : 1;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Pokedex Lite
      </Text>

      <Text>
        Ancho: {width}
      </Text>

      <Text>
        Columnas: {columns}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
});