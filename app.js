const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose.connect("mongodb+srv://arjunsingh27:Test123@cluster0.0t9vaxx.mongodb.net/todoList")
  .then(() => {
    


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






app.listen(process.env.PORT || 3000,function(req,res){
    console.log("Server Started .........");
})

  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });


