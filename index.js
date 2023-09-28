const express = require("express");
const app = express();
const methodOverride = require("method-override");
const path = require("path");
const { v4: uuid } = require("uuid");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); // to use the data from form
app.use(methodOverride("_method"));

app.listen(8100, () => {
  console.log("connected");
});

let contents = [
  {
    id: "e1",
    name: "Hardik",
    quote: "Its badass",
  },

  {
    id: "e2",
    name: "Kankei",
    quote: "sad life",
  },
];

app.get("/", (req, res) => {
  res.render("index", { contents });
});

app.get("/new", (req, res) => {
  res.render("add");
});

app.post("/", (req, res) => {
  const { name, quote } = req.body;

  contents.push({ id: uuid(), name, quote });

  res.redirect("/");
});

app.get("/:id", (req, res) => {
  const { id } = req.params;

  const user = contents.filter((com) => com.id === id);

  res.render("show", { user });
});
