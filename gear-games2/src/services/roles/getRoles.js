const pool = require("../../database");

const getRoles = (req, res) => {
  pool.query("SELECT * FROM roles", (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error getting roles");
    } else {
      res.status(200).send(result.rows);
    }
  });
};

module.exports = getRoles;
