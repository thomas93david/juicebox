//  inside db/index.js

//  All utility functions that provide the utility functions
//  that the rest of our application will use.
//  All is called from the seed file (Main Application as well*)

const { Client } = require("pg"); // imports the pg module

//  supply the db name and location of the database
const client = new Client("postgres://localhost:5432/juicebox-dev");

async function getAllUsers() {
  const { rows } = await client.query(
    `SELECT id, username 
      FROM users;
    `
  );

  return rows;
}

async function createUser({ username, password }) {
  try {
    //results would then return all of the data,
    // with OBJ DEST you can pull out the data within rows{}
    // you can see if you did results
    const { rows } = await client.query(
      `
      INSERT INTO users(username, password)
      VALUES ($1, $2)
      ON CONFLICT (username) DO NOTHING
      RETURNING *;
    `,
      [username, password]
    );

    return { rows };
  } catch (error) {
    throw error;
  }
}

//  and export them
module.exports = {
  client,
  getAllUsers,
  createUser,
};
