# Google AI Pro 12 Tháng / 2 Năm - Tự Động Hóa Kích Hoạt Bằng Mã CDK (Vercel Ready)

Dự án bao gồm trọn bộ:
1. **Giao diện Web Kích Hoạt Bằng Mã CDK (`index.html` / `public/index.html`)**: Thiết kế và luồng hoạt động 5 bước giống 100% trong video (`pro.linshop.duckdns.org`), bao gồm:
   - Kiểm tra mã CDK & cơ chế bảo vệ **Thất bại / Đóng cửa sổ KHÔNG trừ lượt — Chỉ trừ 1 lượt khi thanh toán $0.00 thành công ở Bước 5/5**.
   - Thanh công cụ **Dán/Gõ nhanh Email, Mật khẩu hoặc Số thẻ rồi bấm `➜ Điền vào ô đang chọn`** kèm mã ZIP Mỹ `97201`.
   - Tích hợp sẵn bảng điều khiển **`Google AI Pro 2 năm · Tiện ích`** (với đủ 4 chế độ tiêm: `Lựa chọn 1 · 12 tháng`, `Lựa chọn 2 · 6 tháng (SS)`, `Lựa chọn 3 · 6 tháng`, `Dự phòng · 6 tháng`).
   - Tích hợp màn hình hướng dẫn & thao tác **Kiểm tra Gói Google One & Hủy Gia Hạn Tự Động trên Google Play** (giữ nguyên 12 tháng miễn phí).
   - Bảng **Quản lý CDK (Admin)** cho phép tạo thêm mã mới hoặc nạp lại lượt kích hoạt.
2. **Serverless API cho Vercel (`/api/cdk.js` & `/api/offer-tokens.js`)**: Sẵn sàng chạy ngay khi đẩy lên Vercel.
3. **Thư mục Chrome Extension gốc (`/extension`)**: Chứa nguyên bản `manifest.json`, `inject.js` (can thiệp `Ngbm` và `/eacquire/multiline`), `play_guard.js` (kiểm tra điều khoản `$0.00` trên `tokenized.play.google.com`), `popup.html`, `popup.js`, `content.js`.

## Cách Đẩy Lên Vercel (Chạy Ngay Lập Tức)

### Cách 1: Kéo thả hoặc đẩy qua GitHub
1. Giải nén file `google-ai-pro-cdk-vercel.zip` và đẩy toàn bộ code lên 1 repository GitHub.
2. Truy cập [https://vercel.com/new](https://vercel.com/new), chọn repository vừa tạo và nhấn **Deploy** (không cần chỉnh sửa cấu hình vì đã có sẵn `vercel.json`).

### Cách 2: Dùng Vercel CLI
```bash
npm i -g vercel
vercel --prod
```
