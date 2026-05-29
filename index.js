import express from "express";

const app = express();

app.get("/", async (req, res) => {
  try {
    const r = await fetch(
      "https://blinkit.com/prn/x/prid/716896",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
          "Accept":
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9"
        }
      }
    );

    const html = await r.text();

    res.json({
      status: r.status,
      finalUrl: r.url,
      server: r.headers.get("server"),
      cfRay: r.headers.get("cf-ray"),
      location: r.headers.get("location"),
      contentType: r.headers.get("content-type"),
      title: html.match(/<title>(.*?)<\/title>/i)?.[1] || "NO TITLE",
      length: html.length
    });

  } catch (e) {
    res.json({
      error: e.message,
      stack: e.stack
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
