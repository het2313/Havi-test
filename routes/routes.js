const express = require("express");
const router = express.Router();
const {
  getPosts,
  getPost,
  createPost,
  deletePost,
  getPostByFn,
  getPostByAge,
  getPostByTag,
  getPostByNote,
  addNotes,
  addTag,
} = require("../controller/post");

router.get("/users", getPosts);
router.get("/filterbyfn/:fn", getPostByFn);
router.get("/filterbyage/:age", getPostByAge);
router.get("/filterbytag/:tag", getPostByTag);
router.get("/filterbynote/:note", getPostByNote);
router.put("/addnote/:id/:note", addNotes);
router.put("/addtag/:id/:tag", addTag);
router.post("/users", createPost);
router.delete("/users/:id", deletePost);
router.get("/users/:id", getPost);

module.exports = router;
