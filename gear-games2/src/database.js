const { Client } = require("pg");

const connectionData = {
  host: "localhost",
  user: "postgres",
  database: "geargames",
  password: "123456",
  port: 5432,
};

const Pool = new Client(connectionData);

module.exports = Pool;
