const postsRouter = require("express").Router();
const { getAllPosts } = require("../db");

postsRouter.use((req, res, next) => {
  console.log("A request to http://localhost:3000/api/posts is being made");

  next();
});

postsRouter.get("/", async (req, res) => {
  const posts = await getAllPosts();

  res.send({
    posts,
  });
});
module.exports = postsRouter;
