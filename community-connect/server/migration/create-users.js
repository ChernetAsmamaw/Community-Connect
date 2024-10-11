const { MongoClient } = require("mongodb");

module.exports = {
  async up(db) {
    await db.createCollection("users");
    await db.collection("users").insertMany([
      {
        username: "admin",
        email: "admin@example.com",
        password: "hashed_password_here", 
        createdAt: new Date(),
      },

    ]);
  },

  async down(db) {
    await db.collection("users").drop();
  },
};
