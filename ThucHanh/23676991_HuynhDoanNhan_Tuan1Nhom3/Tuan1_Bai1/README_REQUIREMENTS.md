## Đảm bảo yêu cầu

### A. CORE PRIMITIVES

#### 1. **Tái hiện wireframe bằng các component cơ bản**

- **View**: Sử dụng `SafeAreaView`, `View` cho container, layout sections
- **Text**: Hiển thị tiêu đề, nhãn, giá trị
- **Image**: Có thể mở rộng để thêm ảnh đại diện (hiện dùng avatar circle)
- **TextInput**: Component `SearchField` với placeholder, value, onChangeText
- **ScrollView**: Nội dung chính cuộn được, không tràn ngoài ý muốn

#### 2. **Tách tối thiểu 3 component có ý nghĩa**

Đã tách 5 component rõ ràng:

1. **Header.js** - Thanh tiêu đề "SmartCampus"
2. **Avatar.js** - Hiển thị thông tin sinh viên (avatar circle + tên + mã SV)
3. **InfoRow.js** - Hàng thông tin tái sử dụng (email, lớp, khoa, v.v.)
4. **SearchField.js** - Trường tìm kiếm với state focus
5. **ActionButton.js** - Nút bấm với trạng thái
6. **BottomTabBar.js** - Thanh tab dưới cùng

#### 3. **TextInput, Image, ScrollView đảm bảo yêu cầu**

- **TextInput**:
  - `value={searchQuery}` - Có state value
  - `onChangeText={setSearchQuery}` - Có callback thay đổi
  - `placeholder="Tìm kiếm thông tin..."` - Có placeholder
  - Focus state để visual feedback

- **ScrollView**:
  - Hoạt động trên màn hình hẹp
  - `contentContainerStyle` để padding hợp lý
  - Không có cuộn ngang không mong muốn

---

### B. INTERACTION

#### 1. **2+ hành động Pressable với trạng thái**

- **ActionButton "LƯU HỘ SỐ"** (variant primary)
- Trạng thái bình thường: `#1e66ff` (xanh)
- Trạng thái đang nhấn: `#1452cc` (xanh đậm) + opacity
- Trạng thái vô hiệu hóa: `#ccc` + opacity 0.6

- **ActionButton "XEM CHI TIẾT"** (variant secondary)
- Trạng thái bình thường: `#e8ecf1` (xám nhạt) + border
- Trạng thái đang nhấn: `#d0d8e1` (xám đậm)
- Trạng thái vô hiệu hóa: `#ccc`

- **BottomTabBar Tabs**: 4 tab có Pressable, trạng thái selected với border-top

#### 2. **Phản hồi nhấn được nhìn thấy rõ (không chỉ màu)**

- Khi nhấn **ActionButton**:
- Thay đổi **màu nền** rõ ràng
- Thay đổi **màu văn bản**
- Opacity + scale effect (React Native Pressable)

- Khi nhấn **Tab**:
- Thay đổi **màu label** (xám → xanh)
- Thêm **border-top xanh** trên tab active
- Background highlight khi pressed

#### 3. **Vùng chạm tối thiểu 48×48**

- **ActionButton**:
- `minHeight: 48` + `paddingVertical: 12` + `paddingHorizontal: 20`
- `hitSlop={{ top: 12, bottom: 12, left: 16, right: 16 }}`
- → Vùng chạm thực tế: **72×80px**

- **BottomTabBar Tabs**:
- `paddingVertical: 8` + icon + text = ~60px height
- `hitSlop={{ top: 12, bottom: 12, left: 8, right: 8 }}`
- → Vùng chạm đủ để dễ chạm

#### 4. **Khai báo accessibility properties**

- **ActionButton**:

```javascript
accessible={true}
accessibilityRole="button"
accessibilityLabel={label}
accessibilityState={{
  disabled: isDisabled,
  pressed: isPressed && !isDisabled,
}}
accessibilityHint={isDisabled ? 'Nút này hiện không khả dụng' : undefined}
```

- **SearchField**:

```javascript
accessibilityRole = "search";
accessibilityLabel = { placeholder };
accessibilityHint = "Nhập để tìm kiếm";
```

- **BottomTabBar Tabs**:

```javascript
accessibilityRole="tab"
accessibilityLabel={tab.label}
accessibilityState={{ selected: activeTab === tab.id }}
```

---

## Chạy ứng dụng

### Chạy trên Web

```bash
cd Tuan1
npm install
npx expo start --web
```

Sau đó nhấn `w` để mở web hoặc truy cập `http://localhost:8081`

### Chạy trên Android (với Expo Go)

```bash
npx expo start
```

Quét QR code bằng Expo Go app

### Chạy trên iOS

```bash
npx expo start --ios
```

---

## 🎨 Styling đặc biệt

- **Màu chủ đạo**: `#1e66ff` (xanh dương)
- **Màu nền**: `#f5f7fb` (xám rất nhạt)
- **Màu border**: `#e8ecf1` (xám nhạt)
- **Khoảng cách chuẩn**: 8, 12, 16px
