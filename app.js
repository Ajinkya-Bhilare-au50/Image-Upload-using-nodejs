const express = require("express");
const ejs = require("ejs");
const app = express();
const fs = require("fs");
const fileUpload = require("express-fileupload");
app.use(express.json());
app.set("view engine", "ejs");
app.use(fileUpload());
app.get("/upload", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.use(express.static("uploads"));
let database = [];
// upload route
app.post("/upload", (req, res) => {
  console.log(req.files.gallery);
  console.log(Object.keys(req.files.gallery));
  // fs.writeFile("./")
  const data = req.files.gallery.map((item) => {
    arr = [];
    p = item.name;
    arr.push(p);
    return arr;
  });
  console.log(data.flat());
  database.push(...data.flat());
//   console.log(database);

  Object.keys(req.files.gallery).map((key) => {
    fs.writeFile(
      `./uploads/${req.files.gallery[key].name}`,
      req.files.gallery[key].data,
      () => {
        console.log(`${req.files.gallery[key].name} uploaded successfully`);
      }
    );
  });
  res.render("success");
});

app.post("/", (req, res) => {
  res.send("This is home page with post request.");
});

app.get("/database", (req, res) => {
  res.render("DisplayImages.ejs", { data:database });
});
// PORT
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
