var fs = require("fs");
const Pool = require("./database");
// const dataTables = require.resolve("dataTables.sql");

const migrateDatabase = async () => {
  try {
    const sqlMigrate = fs.readFileSync("dataTables.sql").toString();
    await Pool.query(sqlMigrate);
  } catch (error) {
    console.error(error.stack);
  }
};

module.exports = migrateDatabase;
