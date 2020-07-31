//  uses the Router function to create a new router (usersRouter) and export it from script
const usersRouter = require("express").Router();
const { getAllUsers } = require("../db");

usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");

  next();
});

usersRouter.get("/", async (req, res) => {
  const users = await getAllUsers();

  res.send({
    users,
  });
});
module.exports = usersRouter;
