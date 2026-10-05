import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type Movie = {
  id: string;
  title: string;
  genre: string;
  year: number;
  rating: number;
  poster: string;
  isWatched: boolean;
};

type MovieCardProps = {
  movie: Movie;
  layout?: "row" | "tile";
  onSelect: (id: string) => void;
};

const MovieCard = ({ movie, layout = "row", onSelect }: MovieCardProps) => {
  const isTile = layout === "tile";

  return (
    <TouchableOpacity
      style={[styles.card, isTile && styles.cardTile]}
      onPress={() => onSelect(movie.id)}
    >
      <View style={[styles.posterWrapper, isTile && styles.posterWrapperTile]}>
        <Image
          source={{ uri: movie.poster }}
          style={[styles.poster, isTile && styles.posterTile]}
        />

        {isTile && (
          <Text style={styles.ratingTile}>⭐ {movie.rating.toFixed(1)}</Text>
        )}
      </View>

      <View style={[styles.info, isTile && styles.infoTile]}>
        <Text style={styles.title} numberOfLines={isTile ? 1 : undefined}>
          {movie.title}
        </Text>

        {!isTile && <Text>{movie.genre}</Text>}

        {!isTile && <Text>{movie.year}</Text>}

        {!isTile && <Text>⭐ {movie.rating.toFixed(1)}</Text>}

        <Text>{movie.isWatched ? "✅" : "⏳"}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(MovieCard);

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 12,
  },

  cardTile: {
    flexDirection: "column",
  },

  posterWrapper: {
    position: "relative",
  },

  posterWrapperTile: {
    width: "100%",
  },

  poster: {
    width: 70,
    height: 100,
  },

  posterTile: {
    width: "100%",
    height: undefined,
    aspectRatio: 2 / 3,
  },

  ratingTile: {
    position: "absolute",
    top: 8,
    right: 8,
  },

  info: {
    marginLeft: 12,
  },

  infoTile: {
    marginLeft: 0,
    marginTop: 8,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
