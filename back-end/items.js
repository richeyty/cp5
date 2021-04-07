const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const users = require("./users.js");
const User = users.model;

// Create a scheme for items in the current listings.
const itemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  title: String,
  description: String,
  price: String,
  path: String,
  created: {
    type: Date,
    default: Date.now
  },
});


// Create a model for items in the museum.
const Item = mongoose.model('Item', itemSchema);

// Get a list of all of the items of a single user.
router.get('/:userID', async (req, res) => {
  try {
    let user = await User.findOne({_id: req.params.userID});
    let items = await Item.find({
      user:user
    }).populate('user');
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the items for the listings.
router.get('/', async (req, res) => {
  try {
    let items = await Item.find().sort({
      created: -1
    }).populate('user');
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Delete an item from the current listings.
router.delete('/:id', async (req, res) => {
  try {
    await Item.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Create a new item in the current listings.
router.post('/:userID', async (req, res) => {
  try {
    console.log("test!!!");
    console.log(req.params.userID);
    let user = await User.findOne({_id: req.params.userID});
    console.log(user);
    if (!user) {
      res.send(404);
      return;
    }
    let item = new Item({
      title: req.body.title,
      description: req.body.description,
      user: user,
      price: req.body.price,
      path: req.body.path,
    });
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});



// Edit an item in the current listings.
router.put('/:id', async (req, res) => {
  try {
    let item = await Item.findOne({
      _id: req.params.id
    });
    item.title = req.body.title;
    item.description = req.body.description;
    item.price = req.body.price;

    item.save();
    res.sendStatus(200);

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


module.exports = {
  routes: router,
  model: Item
};
