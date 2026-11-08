// Vercel Serverless Function: /api/offer-tokens
// Trả về cấu hình Token ưu đãi Google AI Pro 2 Năm (12m, 6m_ss, 6m, 6m_2 + YouTube Premium Add-On)

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const PREFIX = "subs:com.google.android.apps.subscriptions.red:";
  const TOKENS = {
    "12m": "AVbCH/cspB8VdqKJ+ax/uPxUFAVuYRPX4iSjtg4Fu0PG9zUeURSM7y//LlQva1dCd/rbKVM6EJmyiG/C9BoQ95pMl8yDCHuiwCvM5CuGJME=",
    "6m_ss": "AVbCH/cgl4zvPT2Lqw95Gn+RYAJIVwFwi783i6uVprX7u3MCa5J4CcTXH5RABa5WjBrUoQnwf8vI10TNV7ktd26myIdxqIwGmNoJ5ofYNqpQ10RKoSvHs75wsfA=",
    "6m": "AVbCH/fUON3w8hpfeutprA3BMQwrBwYIB6Y8CSWi1isDCDswKUUhGQ3dluj5WXsNKOvr8K5UULBGrRsf4KlW1rHLz0fF3SvxQhBFRbBOHCA=",
    "6m_2": "AVbCH/cJ5SeHgkVRt+bdcrapx/aLSu2kbsBgMdI413zbllDNsNQoC/zVlG/Npbu55WlMzBwWPhUedIvZFDg7fw0CmCv/8DKj04IZ21pK7mrV/hh5"
  };
  const YT_FREE_TOK = "AVbCH/eW4Nfp8KBl0zlm7x9PhaiCvpnqwUuL2D8NFPBQgmM9+HuYS1h2xH5lLWU/BsBj775LK5GqK8UHKqoSzhDDz+PqP3paNesqLU0r9i6XCrYa";

  const layer = (req.query && req.query.layer) || "12m";
  const token = TOKENS[layer] || TOKENS["12m"];

  return res.status(200).json({
    ok: true,
    layer,
    prefix: PREFIX,
    full_items: [
      [[PREFIX + "g1.2tb.ai.subs_variant", 21], null, null, null, 1, [token]],
      [[PREFIX + "g1.youtube_premium_individual_add_on", 21], null, null, null, 1, [YT_FREE_TOK]]
    ]
  });
}
