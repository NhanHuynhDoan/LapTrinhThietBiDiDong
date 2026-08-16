import React from "react";
import {
  SectionList,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

type Announcement = {
  id: string;
  tag?: string;
  title: string;
  desc?: string;
  image?: string;
  date: string;
};

type AnnouncementsProps = {
  data?: Announcement[];
  listHeaderComponent?: React.ReactNode;
  listFooterComponent?: React.ReactNode;
};

const now = new Date();
const daysAgo = (n: number) =>
  new Date(now.getTime() - n * 24 * 60 * 60 * 1000).toISOString();

const SAMPLE: Announcement[] = [
  {
    id: "1",
    tag: "Thông báo đào tạo",
    title: "Mở đăng ký học phần Học kỳ 1 (2026 - 2027)",
    desc: "Sinh viên kiểm tra lịch đăng ký theo khóa và hoàn tất điều kiện môn học tiên quyết.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800",
    date: daysAgo(0),
  },
  {
    id: "2",
    tag: "Sự kiện",
    title: "Hội thảo Khoa học Trẻ 2026",
    desc: "Đăng ký tham gia trước 01/09/2026 để nhận tài liệu.",
    date: daysAgo(3),
  },
  {
    id: "3",
    tag: "Thông báo",
    title: "Bảo trì hệ thống",
    desc: "Hệ thống sẽ được bảo trì cuối tuần này.",
    date: daysAgo(10),
  },
];

export default function Announcements({
  data,
  listHeaderComponent,
  listFooterComponent,
}: AnnouncementsProps) {
  const announcements = (data ?? SAMPLE).slice();

  announcements.sort((a, b) => (a.date < b.date ? 1 : -1));

  const daysDiff = (iso: string) => {
    const d = new Date(iso);
    return Math.floor((now.getTime() - d.getTime()) / (24 * 60 * 60 * 1000));
  };

  const today = announcements.filter((a) => daysDiff(a.date) === 0);
  const thisWeek = announcements.filter((a) => {
    const diff = daysDiff(a.date);
    return diff > 0 && diff <= 6;
  });
  const earlier = announcements.filter((a) => daysDiff(a.date) > 6);

  const sections = [
    { title: "Hôm nay", data: today },
    { title: "Tuần trước", data: thisWeek },
    { title: "Trước đó", data: earlier },
  ].filter((s) => s.data.length > 0);

  const renderItem = ({ item }: { item: Announcement }) => (
    <View style={styles.card}>
      {item.image ? (
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          accessibilityRole="image"
          accessibilityLabel={`${item.tag ? item.tag + ": " : ""}${item.title}`}
        />
      ) : (
        <View style={styles.imagePlaceholder} />
      )}
      <View style={styles.content}>
        {item.tag ? <Text style={styles.tag}>{item.tag}</Text> : null}
        <Text style={styles.title}>{item.title}</Text>
        {item.desc ? <Text style={styles.desc}>{item.desc}</Text> : null}
      </View>
    </View>
  );

  const renderSectionHeader = ({ section }: any) => (
    <View style={styles.sectionHeaderRow}>
      <Text style={styles.sectionHeaderText}>{section.title}</Text>
    </View>
  );

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      ItemSeparatorComponent={() => <View style={styles.sep} />}
      ListHeaderComponent={() => <>{listHeaderComponent}</>}
      ListFooterComponent={() => (
        <>
          {listFooterComponent}
          {!listFooterComponent ? (
            <TouchableOpacity style={styles.footer} accessibilityRole="button">
              <Text style={styles.footerText}>Xem tất cả</Text>
            </TouchableOpacity>
          ) : null}
        </>
      )}
      ListEmptyComponent={() => (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Không có thông báo nào</Text>
        </View>
      )}
      stickySectionHeadersEnabled={true}
      SectionSeparatorComponent={() => <View style={{ height: 8 }} />}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
    color: "#0F172A",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  sectionHeaderRow: {
    paddingVertical: 8,
    backgroundColor: "transparent",
  },
  sectionHeaderText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0F172A",
    paddingHorizontal: 2,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    flexDirection: "row",
  },
  image: {
    width: 120,
    height: 120,
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: "#F8FAFC",
  },
  content: {
    padding: 12,
    flex: 1,
  },
  tag: {
    alignSelf: "flex-start",
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 8,
    color: "#2563EB",
    fontWeight: "600",
    fontSize: 11,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
  },
  desc: {
    fontSize: 12,
    color: "#64748B",
    lineHeight: 18,
  },
  sep: {
    height: 12,
  },
  footer: {
    paddingVertical: 12,
    alignItems: "center",
  },
  footerText: {
    color: "#2563EB",
    fontWeight: "700",
  },
  empty: {
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    color: "#94A3B8",
  },
});
