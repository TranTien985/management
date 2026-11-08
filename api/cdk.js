// Vercel Serverless Function: /api/cdk
// Quản lý kiểm tra mã CDK và chỉ trừ lượt khi kích hoạt thành công Gói 12 Tháng ($0.00)

const CDK_DATABASE = {
  "VIP-12M-0001": { code: "VIP-12M-0001", remaining: 1, tier: "12m" },
  "VIP-12M-0002": { code: "VIP-12M-0002", remaining: 2, tier: "12m" },
  "VIP-12M-0003": { code: "VIP-12M-0003", remaining: 1, tier: "12m" },
  "VIP-2Y-9999":  { code: "VIP-2Y-9999",  remaining: 5, tier: "12m" }
};

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { action, code, layer } = req.method === "POST" ? (req.body || {}) : (req.query || {});
  const normalized = String(code || "VIP-12M-0003").trim().toUpperCase();
  const record = CDK_DATABASE[normalized];

  if (!record) {
    return res.status(404).json({
      ok: false,
      error: `Mã "${normalized}" không tồn tại hoặc không hợp lệ.`
    });
  }

  if (action === "deduct_on_success") {
    if (record.remaining <= 0) {
      return res.status(400).json({
        ok: false,
        code: normalized,
        remaining: 0,
        message: "Mã CDK đã hết lượt kích hoạt."
      });
    }
    record.remaining -= 1;
    return res.status(200).json({
      ok: true,
      code: normalized,
      remaining: record.remaining,
      message: `KÍCH HOẠT THÀNH CÔNG GÓI 12 THÁNG! (Đã trừ 1 lượt mã ${normalized})`
    });
  }

  // Default: check / start session (does NOT deduct credit until Step 5 completes)
  return res.status(200).json({
    ok: true,
    code: normalized,
    remaining: record.remaining,
    layer: layer || record.tier || "12m",
    proxy: {
      country: "US",
      state: "Oregon",
      zip: "97201"
    },
    message: `Mã "${normalized}" hợp lệ — Số lượt còn lại: ${record.remaining} lần kích hoạt (Thất bại không trừ, thành công mới trừ)`
  });
}
