import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";

type ImageProp = ImageSourcePropType | { uri: string } | string;

interface CourseCardProps {
  title: string;
  subtitle?: string;
  image?: ImageProp;
  informative?: string;
  decorative?: boolean;
  onPress?: () => void;
  style?: any;
}

const isRemote = (img: any) =>
  typeof img === "string" || (img && typeof img === "object" && "uri" in img);

export default function CourseCard({
  title,
  subtitle,
  image,
  informative,
  decorative = false,
  onPress,
  style,
}: CourseCardProps) {
  const [loading, setLoading] = useState(Boolean(image && isRemote(image)));
  const [failed, setFailed] = useState(false);

  const source = (() => {
    if (!image) return undefined;
    if (typeof image === "string") return { uri: image };
    return image as ImageSourcePropType;
  })();

  const accessibilityProps: any = decorative
    ? {
        importantForAccessibility: "no-hide-descendants",
        accessibilityElementsHidden: true,
      }
    : { accessibilityLabel: informative || title, accessibilityRole: "image" };

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={onPress}
      style={[styles.card, style]}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      <View style={styles.media}>
        {image ? (
          <>
            <Image
              source={source}
              style={styles.image}
              onLoadStart={() => {
                setLoading(true);
                setFailed(false);
              }}
              onLoad={() => setLoading(false)}
              onError={() => {
                setLoading(false);
                setFailed(true);
              }}
              {...accessibilityProps}
            />

            {loading && (
              <View style={styles.overlay} pointerEvents="none">
                <ActivityIndicator size="small" color="#ffffff" />
              </View>
            )}

            {failed && (
              <View
                style={[styles.overlay, styles.failed]}
                pointerEvents="none"
              >
                <Text style={styles.failedText}>Không thể tải ảnh</Text>
              </View>
            )}
          </>
        ) : (
          <View
            style={styles.placeholder}
            accessibilityLabel={informative || "Khung ảnh"}
            accessibilityRole="image"
          >
            <Text style={styles.placeholderText}>Không có ảnh</Text>
          </View>
        )}
      </View>

      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  media: {
    height: 120,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.28)",
  },
  failed: {
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  failedText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  placeholderText: {
    color: "#94A3B8",
    fontWeight: "600",
  },
  body: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
  },
  subtitle: {
    marginTop: 4,
    fontSize: 12,
    color: "#64748B",
  },
});
