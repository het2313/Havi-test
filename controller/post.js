const express = require("express");
const mongoose = require("mongoose");

const Users = require("../models/model");

const router = express.Router();

const getPosts = async (req, res) => {
  try {
    const users = await Users.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Users.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const getPostByFn = async (req, res) => {
  const { fn } = req.params;

  try {
    const users = await Users.find({
      firstname: { $regex: fn },
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const getPostByAge = async (req, res) => {
  const { age } = req.params;

  try {
    const users = await Users.find({
      age: age,
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const getPostByTag = async (req, res) => {
  const { tag } = req.params;

  try {
    const users = await Users.find({ tag: { $regex: tag } });

    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const getPostByNote = async (req, res) => {
  const { note } = req.params;

  try {
    const users = await Users.find({ notes: { $elemMatch: { $regex: note } } });

    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  const post = req.body;

  const newUsers = new Users({
    ...post,
    createdAt: new Date().toISOString(),
  });

  try {
    await newUsers.save();
    res.status(201).json(newUsers);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await Users.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
};
const addNotes = async (req, res) => {
  const { id } = req.params;
  const { note } = req.params;

  const post = await Users.findById(id);
  post.notes.push(note);

  const updatedPost = await Users.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.status(200).json(updatedPost);
};
const addTag = async (req, res) => {
  const { id } = req.params;
  const { tag } = req.params;

  const post = await Users.findById(id);
  post.tag = tag;

  const updatedPost = await Users.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.status(200).json(updatedPost);
};

module.exports = {
  getPosts,
  getPost,
  deletePost,
  createPost,
  getPostByFn,
  getPostByAge,
  getPostByTag,
  getPostByNote,
  addNotes,
  addTag,
};
