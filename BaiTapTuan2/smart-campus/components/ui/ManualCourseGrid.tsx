import React, { useState } from "react";
import { View, StyleSheet, LayoutChangeEvent } from "react-native";
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

export default function ManualCourseGrid({ courses }: { courses?: Course[] }) {
  const items = courses ?? SAMPLE;
  const [width, setWidth] = useState(0);

  const onLayout = (e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width);
  };

  const gap = 16;
  const target = 180; // desired item width
  const columns = Math.max(1, Math.floor((width + gap) / (target + gap)));
  const itemWidth =
    columns > 0 ? Math.floor((width - gap * (columns + 1)) / columns) : width;

  return (
    <View onLayout={onLayout} style={styles.wrapper}>
      <View style={styles.row}>
        {items.map((c) => (
          <View
            key={c.id}
            style={[styles.item, { width: itemWidth, margin: gap / 2 }]}
          >
            <CourseCard title={c.title} subtitle={c.subtitle} image={c.image} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: -8,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  item: {
    margin: 8,
  },
});
