// IMPORT
const mongoose = require("mongoose");
const Item = require("./models/items");
const List = require("./models/list");
const { getDate, getYear, getDay } = require("./date");

module.exports = function (app) {
  app.get("/", function (req, res) {
    const day = getDate();
    const currentYear = new Date().getFullYear();
    Item.find({})
      .then((foundItems) => {
        res.render("list", { listTitle: day, newListItems: foundItems, year: currentYear });
      })
      .catch((err) => {
        res.status(500).send('Internal Server Error');
      });
  });

  app.post("/", function (req, res) {
    const itemName = req.body.newItem;
    const item = new Item({
      name: itemName,
    });

    item.save();
    res.redirect("/");
  });

  app.post("/delete", function (req, res) {
    const checkedItemId = req.body.checkbox;
    Item.findByIdAndRemove(checkedItemId)
      .then((err) => {
        if (!err) {
          console.log("Successfully deleted item!");
        }
        res.redirect("/");
      })
      .catch((error) => {
        res.status(500).send( error + 'Internal Server Error');
      });
  });
};
