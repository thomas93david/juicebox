const tagsRouter = require("express").Router();
const { getAllTags } = require("../db");

tagsRouter.use("/", (req, res, next) => {
  console.log("A request is being made to /tags");

  next();
});

tagsRouter.get("/", async (req, res) => {
  const tags = getAllTags();

  res.send({
    tags,
  });
});

module.exports = tagsRouter;
