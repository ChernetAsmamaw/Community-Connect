require('dotenv').config(); 

module.exports = {
  mongodb: {
    url: process.env.DB_URL, 
    databaseName: "CommunityConnect",
  },
  migrationsDir: "migration", 
  changelogCollectionName: "changelog",
};
