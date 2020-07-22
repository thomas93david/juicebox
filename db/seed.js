//  inside db/seed.js
//  grab our client with destructuring from the export in index.js
const { client, getAllUsers, createUser } = require("./index");

//  this function should call a query which drops all tables from our database
//  we pass the error up to the function that calls dropTables
async function dropTables() {
  try {
    console.log("Starting to drop tables");

    await client.query(`
      DROP TABLE IF EXISTS users;
      `);

    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error dropping tables");
    throw error;
  }
}

//  this function should call a query which creates all tables for our database
async function createTables() {
  try {
    console.log("Starting to create tables");

    await client.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          username varchar(255) UNIQUE NOT NULL,
          password varchar(255) NOT NULL
        );
      `);

    console.log("Created table!");
  } catch (error) {
    console.error("Error creating table");
    throw error;
  }
}

// new function, should attempt to create a few users
async function createInitialUsers() {
  try {
    console.log("Starting to create users...");
    const sandra = await createUser({
      username: "sandra",
      password: "2sandy4me",
    });

    const glamgal = await createUser({
      username: "glamgal",
      password: "soglam",
    });

    const albert = await createUser({
      username: "albert",
      password: "bertie99",
    });

    console.log(albert);

    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();

    await dropTables();
    await createTables();
    await createInitialUsers();
  } catch (error) {
    console.error(error);
  }
}

async function testDB() {
  //    connect the client to the database,
  //    queries are promises, so we can await them
  //    for now, logging is a fine way to see what's up
  //    it's important to close out the client connection
  try {
    console.log("Starting to test database");

    const users = await getAllUsers();
    console.log("getAllUsers:", users);
    console.log("Finished testing database");
  } catch (error) {
    console.error("Error testing database");
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());
