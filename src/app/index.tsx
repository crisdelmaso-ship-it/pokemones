import {
  FlatList,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import { Link } from "expo-router";

import { usePokemonList } from "../app/hooks/usePokemonList";

export default function HomeScreen() {
  const { pokemon, loading, error } =
    usePokemonList();

  const { width } = useWindowDimensions();

  const columns =
    width > 600
      ? 3
      : width > 380
      ? 2
      : 1;

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Cargando Pokémon...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Pokedex Lite
      </Text>

      <FlatList
        data={pokemon}
        key={columns}
        numColumns={columns}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.list}
        columnWrapperStyle={
          columns > 1
            ? styles.columnWrapper
            : undefined
        }
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: "/pokemon/:name",
              params: {
                name: item.name,
              },
            }}
            style={styles.card}
          >
            <Text style={styles.name}>
              {item.name}
            </Text>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },

  list: {
    gap: 12,
  },

  columnWrapper: {
    gap: 12,
  },

  card: {
    flex: 1,
    padding: 20,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 12,
  },

  name: {
    fontSize: 18,
    textTransform: "capitalize",
    fontWeight: "bold",
  },
});