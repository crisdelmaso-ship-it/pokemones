import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  useLocalSearchParams,
} from "expo-router";

import { usePokemonDetail } from "../hooks/usePokemonDetail";

export default function PokemonDetailScreen() {
  const { name } = useLocalSearchParams<{
    name: string;
  }>();

  const {
    pokemon,
    loading,
    error,
  } = usePokemonDetail(name);

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>
          Cargando Pokémon...
        </Text>
      </View>
    );
  }

  if (error || !pokemon) {
    return (
      <View style={styles.center}>
        <Text>
          {error || "Pokémon no encontrado"}
        </Text>
      </View>
    );
  }

  const image =
    pokemon.sprites.other?.[
      "official-artwork"
    ]?.front_default ||
    pokemon.sprites.front_default;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {pokemon.name}
      </Text>

      {image && (
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="contain"
        />
      )}

      <Text style={styles.sectionTitle}>
        Tipos
      </Text>

      <View style={styles.types}>
        {pokemon.types.map((item) => (
          <View
            key={item.slot}
            style={styles.type}
          >
            <Text style={styles.typeText}>
              {item.type.name}
            </Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>
        Estadísticas
      </Text>

      {pokemon.stats.map((item) => (
        <View
          key={item.stat.name}
          style={styles.stat}
        >
          <Text style={styles.statName}>
            {item.stat.name}
          </Text>

          <Text style={styles.statValue}>
            {item.base_stat}
          </Text>
        </View>
      ))}

      <Text style={styles.info}>
        Altura: {pokemon.height}
      </Text>

      <Text style={styles.info}>
        Peso: {pokemon.weight}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginBottom: 20,
  },

  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "stretch",
    marginTop: 20,
    marginBottom: 10,
  },

  types: {
    flexDirection: "row",
    gap: 10,
  },

  type: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 20,
  },

  typeText: {
    textTransform: "capitalize",
    fontWeight: "bold",
  },

  stat: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
  },

  statName: {
    textTransform: "capitalize",
  },

  statValue: {
    fontWeight: "bold",
  },

  info: {
    fontSize: 18,
    marginTop: 10,
  },
});