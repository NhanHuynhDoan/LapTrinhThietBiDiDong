# Hướng dẫn test và chụp ảnh bài 1–2–3

Làm lần lượt trên **web Chrome/Edge** để chụp được cả giao diện và Network/Local Storage.
Các chức năng tương tự trên Expo Go; những đoạn Console dưới đây chỉ dùng cho web.
Chụp ảnh của lần bạn tự thao tác để nộp bài. Mật khẩu tài khoản mẫu: `123456`.

**Test GET/POST trên Postman:** mở [POSTMAN_TEST.md](POSTMAN_TEST.md).
File có URL đầy đủ, Authorization, Body JSON, mã kết quả và ý nào cần chụp thêm trên app.

## 1. Chạy dự án

Mở PowerShell ngay trong thư mục `tuan9_2` ở vị trí bạn đã chép dự án:

```powershell
npm.cmd ci
npm.cmd --prefix server ci
```

Chỉ cần cài lại khi chưa có `node_modules` hoặc thay đổi dependencies. Đã được cài khi kiểm tra bài.

Terminal 1, để chạy liên tục:

```powershell
npm.cmd run server
```

Terminal 2:

```powershell
npm.cmd run web
```

Mở `http://localhost:8082`. Backend: `http://localhost:3002/books`.
Nếu hai tiến trình đã chạy thì mở trang trực tiếp, không chạy thêm lần nữa.
Nhấn Ctrl+C trong terminal tương ứng khi muốn dừng.

DB mẫu có 20 sách, 28 đánh giá và 4 tài khoản riêng của BookStore 9.2.
Các lần gửi đánh giá/đăng ký sẽ tăng số bản ghi. Không ghi đè `server/db.json` bằng seed.

Trên điện thoại: `npm.cmd start`, quét QR bằng Expo Go, cùng Wi-Fi với máy tính.
Nếu không kết nối được API, làm theo `.env.example` và README, dùng IPv4 máy tính thay `localhost`.

## 2. Chuẩn bị DevTools để lấy bằng chứng

- Nhấn **F12 → Network → Fetch/XHR**. Bật **Preserve log**, xóa log cũ trước mỗi tình huống.
- Muốn chụp giao diện điện thoại: Ctrl+Shift+M, chọn màn hình khoảng 390 × 844.
- Chọn request để xem **Headers**, **Payload**, **Response**. Các request ảnh bìa không phải API cần chấm.
- Xem dữ liệu lưu: **Application → Local Storage → http://localhost:8082 → auth:tuan9_2**.
  Trên web, AsyncStorage sử dụng Local Storage. Giá trị `auth:tuan9_2` gồm `token`, `user`, `expiresAt`.
- Khi chụp token chỉ để lộ một phần đầu; bằng chứng cần cho thấy có token và không có `password`.
  Không bật tính năng lưu mật khẩu của trình duyệt trong các lần thử.

## 3. Bài 1 — Đăng nhập / Đăng ký với JWT thật

### Ảnh 01 — Validate dưới từng ô

1. Từ Home chọn **Đăng nhập / Đăng ký**.
2. Nhập email `sai-email`, mật khẩu `12345`, bấm nút **Đăng nhập** ở dưới form.
3. Chụp thấy `Email không đúng định dạng.` dưới email và `Mật khẩu phải có ít nhất 6 ký tự.` dưới mật khẩu.
4. Có thể chụp thêm lần để trống hai ô. Network không có `POST /login` vì form đã chặn.
5. Chuyển tab **Đăng ký**, thử tương tự; tên trống cũng có lỗi dưới ô Họ tên.

### Ảnh 02 — POST /login thật

1. Ở tab đăng nhập, nhập `test@gmail.com` / `123456`.
2. Xóa log Network, bấm nút đăng nhập dưới form.
3. Chụp Network request **login**, Headers có `POST`, status `200`.
4. Response có `accessToken` và `user` (`id: 4`, email `test@gmail.com`), không có password.
5. Giao diện Home hiện lời chào và nút **Đăng xuất**.

### Ảnh 03 — POST /register thật

1. Đăng xuất → vào form → tab **Đăng ký**.
2. Tên `Bạn đọc BookStore 9.2`, email mới chưa dùng, ví dụ `bandoc.moc01@gmail.com`, mật khẩu `123456`.
3. Bấm **Tạo tài khoản**, chụp request **register**: `POST`, status `201`, Response có token và user mới.
4. Home đăng nhập ngay với tài khoản mới. Lần thử sau đổi đuôi `.01` thành `.02` nếu email đã tồn tại.

### Ảnh 04 và 05 — Lỗi server được dịch sang tiếng Việt

- **Sai mật khẩu:** đăng xuất, đăng nhập `test@gmail.com` / `654321`.
  Chụp giao diện `Email hoặc mật khẩu không đúng.` và Response của `POST /login` trả `400`, `Incorrect password`.
  Phải nhập mật khẩu từ 6 ký tự để request thực sự đến server.
- **Trùng email:** tab Đăng ký, nhập tên bất kỳ, `test@gmail.com`, `123456`.
  Chụp `Email đã được sử dụng.` và Response `400`, `Email already exists`.

### Ảnh 06 — Lưu phiên, không lưu mật khẩu

1. Đăng nhập lại tài khoản `test@gmail.com` / `123456`.
2. F12 → Application → Local Storage → chọn `auth:tuan9_2`.
3. Chụp giá trị gồm `token`, `user: {id, name, email}`, `expiresAt`; không có `password` hay hash.
4. Redux lưu cùng phiên công khai đó ở `state.auth.session` (xem `src/store/authSlice.ts`).
   Dự án không cài Redux DevTools riêng. Nếu cần ảnh minh chứng mã nguồn cho store, chụp
   `saveSession` và `saveSession.fulfilled` cùng `saveStoredSession` trong `src/services/sessionService.ts`.

## 4. Bài 2 — Auto-login có xác minh token

### Ảnh 07 — Token còn hạn: GET /users/:id kèm Bearer

1. Đang đăng nhập Test, giữ Network mở và **Preserve log**, bấm Ctrl+R.
2. Home vẫn có lời chào. Network xuất hiện **GET /users/4 → 200**.
3. Chụp Request Headers có `Authorization: Bearer ...` cùng status `200`.
4. Kiểm tra `auth:tuan9_2` trong Local Storage vẫn không có password dù Response `/users/4` có hash.

### Cách dùng kịch bản token mà không phải chờ 1 giờ

Mỗi tình huống bên dưới làm trong terminal thứ 3 tại thư mục `tuan9`:

```powershell
npm.cmd run test:session -- TEN_KICH_BAN
Get-Content -Raw .test-output/session-console.js | Set-Clipboard
```

Thay `TEN_KICH_BAN` bằng tên trong từng mục. Sau đó mở **Console** của đúng trang
`http://localhost:8082`, dán Ctrl+V, nhấn Enter. Mã được tạo từ script của dự án;
bạn có thể mở `.test-output/session-console.js` đọc trước. Nếu trình duyệt chặn dán,
đọc thông báo của trình duyệt và chỉ cho phép sau khi đã kiểm tra mã.

Đây là thao tác chủ động làm hỏng phiên thử để chứng minh cách ứng dụng xử lý.
Không sửa file `db.json` hay mã chạy của app. Sau mỗi tình huống đăng nhập lại Test.

### Ảnh 08 — JWT hết hạn: không auto-login

1. Đăng nhập Test, xóa log Network.
2. Tạo kịch bản **expired**, sao chép và chạy trong Console như trên.
3. Trang tự reload và hiện `Bạn chưa đăng nhập.`; `auth:tuan9_2` bị xóa.
4. Network **không có GET /users/4** ở lần reload này vì app đọc `exp` và chặn trước.
5. Chụp Home và Network. Đoạn test cố tình để `expiresAt` ở tương lai nhưng JWT đã hết hạn,
   chứng minh app dùng `exp` bên trong token, không tin hạn lưu bên ngoài.

### Ảnh 09 — Còn exp nhưng sai chữ ký: server trả 401 và xóa phiên

1. Đăng nhập Test, xóa log Network.
2. Chạy kịch bản **invalid** trong Console.
3. Reload tự động: **GET /users/4 → 401**, Response `invalid signature`.
4. Chụp request 401 và Home chưa đăng nhập. Kiểm tra `auth:tuan9_2` đã bị xóa.

### Ảnh 10 — Token không có quyền với user: 403 và xóa phiên

1. Đăng nhập Test, xóa log Network.
2. Chạy kịch bản **forbidden** trong Console. Nó giữ token Test nhưng sửa user id lưu thành 1.
3. Reload tự động: **GET /users/1 → 403**; Home chưa đăng nhập; `auth:tuan9_2` bị xóa.
4. Chụp request 403 và trạng thái chưa đăng nhập.

### Ảnh 11 — Đăng xuất xóa phiên

1. Đăng nhập Test → Home → **Đăng xuất**.
2. Chụp `Bạn chưa đăng nhập.` và Local Storage không còn `auth:tuan9_2`.
3. Ctrl+R: vẫn chưa đăng nhập, không khôi phục phiên cũ.

### Ảnh 12 — Checkout được bảo vệ và quay lại sau đăng nhập

1. Khi chưa đăng nhập, mở `http://localhost:8082/checkout`.
2. Chụp màn đăng nhập và dòng `Đăng nhập để tiếp tục thanh toán.` (trang đã chuyển sang Login).
3. Đăng nhập Test: tự quay lại **Bài 2 - Thanh toán**.
4. Về Home → chọn sách → Thêm vào giỏ → Đến thanh toán; chụp tên tài khoản và tổng tiền.
5. Có thể bấm xác nhận để thấy thanh toán mô phỏng thành công. Giỏ chỉ lưu trong Redux;
   đừng reload giữa bước thêm sách và chụp giỏ vì sẽ mất giỏ trong phiên chạy.

## 5. Bài 3 — Review là resource riêng

### Ảnh 13 — GET đúng query, danh sách mới nhất trước và điểm trung bình

1. Mở `http://localhost:8082/books/8` (Tư Duy Nhanh Và Chậm).
2. Network có **GET /reviews?bookId=8&_sort=createdAt&_order=desc → 200**.
3. Chụp URL/query đó và Response: chỉ có review `bookId: 8`, ngày mới nhất ở trên.
4. Chụp giao diện phần `Bài 3 - Đánh giá` và `Điểm: .../5` cùng danh sách.
   Component dùng lại `RatingStars`, hiện số điểm và các nút 1–5 để chọn.
5. Điểm trung bình được tính từ các review hiện tại của sách 8.
   Sau khi gửi review mới, số lượt và điểm trung bình tự thay đổi.

### Ảnh 14 — POST kèm token, chèn đầu danh sách, không reload

1. **Bắt buộc dùng `test@gmail.com` / `123456`**, mở sách **id 8**.
2. Xóa log Network sau khi trang đã tải xong; không reload trong các bước tiếp theo.
3. Chọn **5 điểm**, bình luận `Tuần 9 - Test JWT và lưu review cho sách 8.` rồi Gửi đánh giá.
4. Chụp **POST /reviews → 201**, Headers có Bearer token, Payload có `bookId: 8`, `userId: 4`.
5. Chụp giao diện: `Đã gửi đánh giá.`, review vừa gửi đứng đầu, số lượt và điểm trung bình đổi ngay.
   Tổng số đánh giá tăng thêm 1 và trung bình được tính lại theo dữ liệu hiện tại.
6. Trong log kể từ lúc bấm gửi chỉ có POST, không có GET lại sách/reviews và không có request Document mới.
   Đây là bằng chứng không reload cả trang.

### Ảnh 15 — Kiểm tra bắt buộc: dữ liệu ghi thật vào db.json

1. Mở tab mới `http://localhost:3002/reviews?bookId=8&_sort=createdAt&_order=desc`.
2. Chụp bản ghi chứa bình luận của bạn, `bookId: 8`, `userId: 4`, `rating: 5`, id và `createdAt`.
3. Có thể mở thêm URL đúng như đề: `http://localhost:3002/reviews?bookId=8` (URL này không sắp xếp).
4. Mở `server/db.json`, tìm nguyên văn bình luận để chụp thêm nếu cần. Ctrl+R app, review vẫn còn.

### Ảnh 16 — Token hết hạn lúc gửi: 401, tự logout, hiện nút đăng nhập

1. Đăng nhập Test, mở `/books/8`. Chọn điểm và nhập bình luận thử.
2. Tạo kịch bản **review-expired**, sao chép và chạy trong Console theo mục trên.
3. **KHÔNG reload trang.** Đóng Console hoặc chuyển sang Network rồi bấm **Gửi đánh giá**.
4. Kịch bản chỉ thay token của POST /reviews kế tiếp bằng JWT đã hết hạn, có chữ ký thật
   của server bài tập. Redux vẫn đang đăng nhập lúc gửi để kiểm tra đúng nhánh xử lý 401.
5. Chụp **POST /reviews → 401**, Response `jwt expired`, và giao diện có:
   `Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.` + nút **Đăng nhập để viết đánh giá**.
6. `auth:tuan9_2` bị xóa; không có review mới. Bấm nút đăng nhập, đăng nhập lại thì quay về đúng sách 8.
7. Bộ can thiệp tự gỡ sau một request. Nếu chưa bấm gửi mà muốn hủy, reload trang
   hoặc chạy `window.__restoreMocSachReviewTest?.()` trong Console.

## 6. Kiểm tra API bằng Postman và kiểm thử tự động

File `postman/tuan9.postman_collection.json` có sẵn các request và assertions.
Import file vào Postman, chạy theo thứ tự. Biến `baseUrl` mặc định là `http://localhost:3002`;
đăng nhập tự lấy token để dùng cho các request sau. Collection thêm **một review vào sách 8 mỗi lần chạy**.
Không cần đưa token thủ công hoặc đăng nhập tài khoản Postman để chạy từ CLI:

```powershell
postman collection run postman/tuan9.postman_collection.json --no-report-events
```

Kiểm tra mã và API thực bằng bộ test dùng DB tạm, không sửa DB của app:

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd test
npx.cmd expo export --platform web
```

## 7. Danh sách ảnh để nộp

| Ảnh | Ý cần chứng minh |
| --- | --- |
| 01 | Email sai, password dưới 6 ký tự, lỗi dưới từng ô |
| 02 | POST /login, JWT và user trả về |
| 03 | POST /register tạo tài khoản mới |
| 04–05 | Sai mật khẩu và trùng email được dịch tiếng Việt |
| 06 | Lưu token + user trong AsyncStorage, không lưu password; có thể thêm ảnh mã store |
| 07 | Reload còn hạn gọi GET /users/4 kèm Bearer |
| 08 | JWT hết hạn không auto-login, xóa phiên |
| 09–10 | Xác minh 401 và 403 đều xóa phiên |
| 11 | Đăng xuất xóa phiên, reload vẫn thoát |
| 12 | Checkout chuyển tới Login, đăng nhập xong quay lại |
| 13 | GET reviews đúng query, thứ tự và trung bình |
| 14 | POST review kèm token, chèn đầu, không reload |
| 15 | Review Test cho sách 8 đã nằm trong API và db.json |
| 16 | POST hết hạn trả 401, tự thoát và hiện nút đăng nhập |

Một số mục nên chụp 2 ảnh: giao diện và Network. Không bắt buộc gộp tất cả bằng chứng vào một ảnh.
