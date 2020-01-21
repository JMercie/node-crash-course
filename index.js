const http = require("http");
const path = require("path");
const fs = require("fs");
const URL = require("url");

const server = http.createServer((req, res) => {
  //   if (req.url === "/") {
  //     fs.readFile(
  //       path.join(__dirname, "public", "index.html"),
  //       (err, content) => {
  //         res.writeHead(200, { "Content-Type": "text/html" });
  //         res.end(content);
  //       }
  //     );
  //   }
  //   if (req.url === "/api/users") {
  //     const users = [
  //       { name: "bob", id: "uuid.v4()" },
  //       { name: "car", id: "uuid.v4()" },
  //       { name: "lu", id: "uuid.v4()" }
  //     ];
  //     res.writeHead(200, { "Content-Type": "application/json" });
  //     res.end(JSON.stringify(users));
  //   }

  // build file path

  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );
  // extension file
  let extname = path.extname(filePath);

  // initial content type

  let contentType = "text/html";

  // check ext and set content type

  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "img/png";
      break;
    case ".jpg":
      contentType = "img/jpg";
      break;
  }

  //read file

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == "ENOENT") {
        // page not found
        console.log("its an error");
      } else {
        // some server error
        res.writeHead(500);
        res.end(`server error: ${error.code}`);
      }
    } else {
      // success
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "uft8");
    }
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`server running on port ${PORT}`));
