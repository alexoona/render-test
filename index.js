import express from "express";

const app = express();

app.get("/", async (req, res) => {
  try {
    const r = await fetch("https://blinkit.com");

    const html = await r.text();

    res.json({
      status: r.status,
      contentType: r.headers.get("content-type"),
      hasBlinkit: html.includes("Blinkit"),
      preview: html.slice(0, 2000)
    });

  } catch (e) {
    res.json({
      error: e.message
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Running on", PORT);
});
