import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  RefreshControl,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import MovieCard, { Movie } from "./components/MovieCard";

const API_URL = "https://6ac33cb0ae53bf25b80e379c.mockapi.io/Movies";
const LIMIT = 10;

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isTile, setIsTile] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [failedPage, setFailedPage] = useState<number | null>(null);

  const loadingRef = useRef(false);

  const numColumns = isTile ? 2 : 1;

  const loadPage = async (
    pageNumber: number,
    replace: boolean = false,
    isRefresh: boolean = false,
  ) => {
    if (loadingRef.current) {
      return;
    }

    loadingRef.current = true;
    setFailedPage(null);

    if (isRefresh) {
      setRefreshing(true);
    } else if (pageNumber === 1 && movies.length === 0) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const response = await fetch(
        `${API_URL}?page=${pageNumber}&limit=${LIMIT}`,
      );

      if (!response.ok) {
        throw new Error("Tải thất bại");
      }

      const data: Movie[] = await response.json();

      if (replace) {
        const uniqueMovies = Array.from(
          new Map(data.map((movie) => [movie.id, movie])).values(),
        );

        setMovies(uniqueMovies);
      } else {
        setMovies((currentMovies) => {
          const allMovies = [...currentMovies, ...data];

          return Array.from(
            new Map(allMovies.map((movie) => [movie.id, movie])).values(),
          );
        });
      }

      setPage(pageNumber);
      setHasMore(data.length === LIMIT);
    } catch (error) {
      setFailedPage(pageNumber);
    } finally {
      loadingRef.current = false;
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadPage(1, true);
  }, []);

  const handleLoadMore = () => {
    if (loadingRef.current || !hasMore || failedPage !== null) {
      return;
    }

    loadPage(page + 1);
  };

  const handleRefresh = () => {
    if (loadingRef.current) {
      return;
    }

    setHasMore(true);
    setFailedPage(null);
    loadPage(1, true, true);
  };

  const handleRetry = () => {
    if (failedPage === null) {
      return;
    }

    loadPage(failedPage, failedPage === 1);
  };

  const handleSelect = (id: string) => {
    const movie = movies.find((item) => item.id === id);

    if (movie) {
      Alert.alert(`${movie.title} (${movie.year})`);
    }
  };

  const renderFooter = () => {
    if (loadingMore) {
      return <ActivityIndicator size="small" />;
    }

    if (failedPage !== null) {
      return (
        <View style={styles.footer}>
          <Text>Tải thất bại</Text>
          <Button title="Thử lại" onPress={handleRetry} />
        </View>
      );
    }

    if (!hasMore && movies.length > 0) {
      return (
        <View style={styles.footer}>
          <Text>— Đã hết danh sách —</Text>
        </View>
      );
    }

    return null;
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Movie App</Text>

          <View style={styles.switchContainer}>
            <Text>Dạng lưới</Text>
            <Switch value={isTile} onValueChange={setIsTile} />
          </View>
        </View>

        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            key={String(numColumns)}
            data={movies}
            numColumns={numColumns}
            keyExtractor={(item) => item.id}
            columnWrapperStyle={isTile ? styles.columnWrapper : undefined}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
            renderItem={({ item }) => (
              <View style={isTile ? styles.tileItem : undefined}>
                <MovieCard
                  movie={item}
                  layout={isTile ? "tile" : "row"}
                  onSelect={handleSelect}
                />
              </View>
            )}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  header: {
    padding: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  columnWrapper: {
    gap: 12,
  },

  tileItem: {
    flex: 1,
    maxWidth: "50%",
  },

  footer: {
    alignItems: "center",
    padding: 16,
    gap: 8,
  },
});
