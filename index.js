const express = require("express");
const bodyparser = require("body-parser");
const Next = require("next");

const PORT = process.env.PORT || 5000;

const dev = process.env.NODE_ENV !== "production";

//might need to change this
app = Next({ dev });

const handle = app.getRequestHandler(app);

app
  .prepare()
  .then(() => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    const server = express();

    server.use(bodyparser.urlencoded({ extended: false }));
    server.use(bodyparser.json({ limit: "50mb" }));

    server.use("/api/hello", (req, res) => {
      res.send({ msg: "Hello" });
    });
    if (!pathname.contains("api")) server.get("*", handle);

    server.listen(PORT, (err) => {
      if (err) throw err;

      console.log(`App is running in port ${PORT}`);
    });
  })
  .catch(() => {
    process.exit(1);
  });
