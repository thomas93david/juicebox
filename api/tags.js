const tagsRouter = require("express").Router();
const { getAllTags } = require("../db");
const { getPostsByTagName } = require("../db");

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

tagsRouter.get("/:tagName/posts", async (req, res, next) => {
  //  read the tagname from the params
  const { tagName } = req.params;

  try {
    //  use our method to get posts by tag name from the db
    const allTagsByPost = await getPostsByTagName(tagName);

    const posts = allTagsByPost.filter((tag) => {
      return post.active || (req.user && post.author.id === req.user.id);
    });

    //  send out an object to the client { posts: // posts }
    res.send({ posts });
  } catch ({ name, message }) {
    next({
      name: "ErrorGettingTagByName",
      message: "Cannot get tag by name",
    });
    //  forward the name and message to the error handler
  }
});

module.exports = tagsRouter;
