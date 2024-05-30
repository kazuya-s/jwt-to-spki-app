const jose = require("jose");
const express = require("express");

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/cert", (req, res) => {
  if (req.body) {
    (async () => {
      const pubKey = await jose.importJWK(req.body);
      const cert = await jose.exportSPKI(pubKey);
      res.json({ cert: cert });
    })().catch(() => {
      res.status(400);
      res.json({ message: "convert error" });
    });
  } else {
    res.status(400);
    res.json({ message: "body is not found" });
  }
});

const server = app.listen(port, () =>
  console.log(`app listening on port ${port}!`)
);
