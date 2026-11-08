/**
 * Remote Browser Worker (Playwright + Chrome Extension `google_pro_tieng_viet` + US Proxy ZIP 97201)
 * Dùng khi bạn muốn stream trình duyệt Chromium thật (như trên VPS / Browserless) kết nối với giao diện Vercel.
 */
const path = require("path");
const express = require("express");
const { chromium } = require("playwright-core");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

const EXTENSION_PATH = path.join(__dirname, "../extension");

app.post("/api/launch-remote-session", async (req, res) => {
  const { cdk, layer = "12m", proxyServer } = req.body || {};
  try {
    const launchOptions = {
      headless: false,
      args: [
        `--disable-extensions-except=${EXTENSION_PATH}`,
        `--load-extension=${EXTENSION_PATH}`,
        "--no-sandbox",
        "--disable-setuid-sandbox"
      ]
    };
    if (proxyServer) {
      launchOptions.proxy = { server: proxyServer };
    }
    const context = await chromium.launchPersistentContext("", launchOptions);
    const page = await context.newPage();
    await page.addInitScript((selectedLayer) => {
      document.documentElement.setAttribute("data-gapt-layer", selectedLayer);
    }, layer);
    await page.goto("https://accounts.google.com/ServiceLogin?continue=https://one.google.com/plans");
    res.json({ ok: true, message: "Đã khởi tạo phiên Chromium kèm Tiện ích Tiêm Offer", cdk, layer });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server Google AI Pro CDK đang chạy tại http://localhost:${PORT}`);
});
