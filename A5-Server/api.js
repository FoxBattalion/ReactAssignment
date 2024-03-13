const express = require("express");
const path = require("path");
const menuItemAccessor = require("./db/MenuItemAccessor.js");
const { MenuItem } = require("./entity/MenuItem.js");
const cors = require("cors");
const app = express();
const PORT_NUM = 8000;
const PUBLIC_FOLDER = "public";
app.use(cors());

// One line of code replaces our whole static module:
//   Express finds the file, sets the correct content type,
//   and sends the file with status code 200.
app.use(express.static(PUBLIC_FOLDER));

app.use(express.json()); // needed to parse JSON data in POST/PUT requests

app.get("/api/menuItems", async function (req, res) {
  try {
    let data = await menuItemAccessor.getAllItems();
    res.status(200).json({ err: null, data: data });
  } catch (err) {
    res.status(500).json({ err: "could not read data" + err, data: null });
  }
});
app.delete("/api/menuItems/:key(\\d{3})", async function (req, res) {
  let id = Number(req.params.key);
  let item = new MenuItem(id, "ENT", "nothing", 99, false);
  try {
    let ok = await menuItemAccessor.deleteItem(item);
    if (ok) {
      res.status(200).json({ err: null, data: true });
    } else {
      res
        .status(404)
        .json({ err: "item " + item.id + " does not exist", data: null });
    }
  } catch (err) {
    res.status(500).json({ err: "Delete aborted" + err, data: null });
  }
});

app.put("/api/menuItems/:id(\\d{3})", async function (req, res) {
  let menuItem = req.body;
  let argError = MenuItem.checkArgs(
    Number(menuItem.id),
    menuItem.category,
    menuItem.description,
    Number(menuItem.price),
    menuItem.vegetarian
  );
  if (argError !== null) {
    res.status(400).json({ err: "MenuItem constructor error", data: null });
  } else {
    let item = new MenuItem(
      Number(menuItem.id),
      menuItem.category,
      menuItem.description,
      Number(menuItem.price),
      menuItem.vegetarian
    );
    try {
      let ok = await menuItemAccessor.updateItem(item);
      if (ok) {
        res.status(200).json({ err: null, data: true });
      } else {
        res
          .status(404)
          .json({ err: "item " + item.id + " does not exist", data: null });
      }
    } catch (err) {
      res.status(500).json({ err: "update aborted" + err, data: null });
    }
  }
});

app.post("/api/menuItems/:id(\\d{3})", async function (req, res) {
  let menuItem = req.body;
  let argError = MenuItem.checkArgs(
    Number(menuItem.id),
    menuItem.category,
    menuItem.description,
    Number(menuItem.price),
    menuItem.vegetarian
  );
  if (argError == null) {
    let item = new MenuItem(
      Number(menuItem.id),
      menuItem.category,
      menuItem.description,
      Number(menuItem.price),
      menuItem.vegetarian
    );

    try {
      let ok = await menuItemAccessor.addItem(item);
      if (ok) {
        res.status(201).json({ err: null, data: true });
      } else {
        res
          .status(409)
          .json({ err: "item " + item.id + " already exists", data: null });
      }
    } catch (err) {
      res.status(500).json({ err: "add aborted" + err, data: null });
    }
  } else {
    res.status(400).json({ err: "MenuItem constructor error", data: null });
  }
});

//*** Invalid URLs ***//

app.get("/api/menuItems/:key(\\d{3})", function (request, response) {
  response.status(405).json({ err: "Single GETs not supported", data: null });
});

app.delete("/api/menuItems", function (request, response) {
  response.status(405).json({ err: "Bulk deletes not supported", data: null });
});

app.put("/api/menuItems", function (request, response) {
  response.status(405).json({ err: "Bulk updates not supported", data: null });
});

app.post("/api/menuItems", function (request, response) {
  response.status(405).json({ err: "Bulk inserts not supported", data: null });
});

app.use((req, res, next) =>
  res.status(404).sendFile(path.join(__dirname, PUBLIC_FOLDER, "404.html"))
);
app.listen(PORT_NUM, () => {
  console.log(`Example app listening on port ${PORT_NUM}!`);
});
