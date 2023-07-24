const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const app = express();
mongoose.connect("mongodb+srv://arjunsingh27:Test123@cluster0.0t9vaxx.mongodb.net/todoList");




app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));


app.get("/", function (req, res) {
  Item.find({})
    .then((founditem) => {
      console.log(founditem);
      if (founditem.length === 0) { // Checking the length of the array
        Item.insertMany(defaultcollection)
          .then(() => {
            res.redirect("/");
          })
          .catch((err) => {
            console.error("Error inserting default collection:", err);
            res.status(500).send("Internal Server Error");
          });
      } else {
        res.render("index", { collection: founditem });
      }
    })
    .catch((err) => {
      console.error("Error finding items:", err);
      res.status(500).send("Internal Server Error");
    });
});


app.post("/delete", function (req, res) {
  const checkItemId = req.body.checkbox;
  checkremove(checkItemId);
  async function checkremove(checkItemId) {
    try {
      await Item.findByIdAndDelete(checkItemId);
    } catch (error) {
      console.log("not deleted");
    }
  }
  res.redirect("/");
});



app.post("/", function (req, res) {
  const newitem = req.body.listItem;
  const item = new Item({
    name: newitem
  });
  item.save();
  res.redirect("/");
});



const itemSchema = ({
  name: String
});

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
  name: "task one "
});
const item2 = new Item({
  name: "task tw0 "
});
const item3 = new Item({
  name: "task Three "
});

const defaultcollection = [item1, item2, item3];






app.listen("3000", (req, res) => {
  console.log("App Started");
});
