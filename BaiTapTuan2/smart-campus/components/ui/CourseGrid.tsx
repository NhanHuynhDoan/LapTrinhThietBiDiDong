import React from "react";
import { View, StyleSheet } from "react-native";
import CourseCard from "@/components/CourseCard";

type Course = { id: string; title: string; subtitle?: string; image?: string };

const SAMPLE: Course[] = Array.from({ length: 8 }).map((_, i) => ({
  id: String(i + 1),
  title: `Course ${i + 1}`,
  subtitle: "Instructor Name",
  image:
    i % 2 === 0
      ? undefined
      : "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800",
}));

export default function CourseGrid({ courses }: { courses?: Course[] }) {
  const items = courses ?? SAMPLE;

  return (
    <View style={styles.container}>
      {items.map((c) => (
        <View key={c.id} style={styles.item}>
          <CourseCard title={c.title} subtitle={c.subtitle} image={c.image} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: -8,
  },
  item: {
    // responsive sizing via flexBasis + min/max + grow
    flexBasis: 180,
    minWidth: 140,
    maxWidth: 300,
    flexGrow: 1,
    margin: 8,
  },
});
