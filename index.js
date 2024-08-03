const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const database = require("./db/db");
const usersRoutes = require("./routes/users");
const pesertaRoutes = require("./routes/peserta");
const fileUpload = require("express-fileupload");

app.use(express.static("public"));
app.use(express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

database
  .sync()
  .then(() => {
    console.info("database synced");
  })
  .catch((err) => {
    console.error("failed to sync database: " + err.message);
  });

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/view/index.html"));
});

app.get("/index_peserta", function (req, res) {
  res.sendFile(path.join(__dirname, "/view/index_peserta.html"));
});

app.get("/tambah", function (req, res) {
  res.sendFile(path.join(__dirname, "/view/tambah.html"));
});

app.get("/tambah_peserta", function (req, res) {
  res.sendFile(path.join(__dirname, "/view/tambah_peserta.html"));
});

app.get("/edit/:id", function (req, res) {
  res.sendFile(path.join(__dirname, "/view/edit.html"));
});

app.get("/edit_peserta/:id", function (req, res) {
  res.sendFile(path.join(__dirname, "/view/edit_peserta.html"));
});

// Routes
app.use('/users', usersRoutes);
app.use('/peserta', pesertaRoutes);

// Export the app for Vercel
module.exports = app;
