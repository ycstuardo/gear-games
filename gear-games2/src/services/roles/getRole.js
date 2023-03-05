const pool = require("../../database");

const getRole = (req, res) => {
  const roleId = req.params.id;

  pool.query("SELECT * FROM roles WHERE id = $1", [roleId], (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error getting role");
    } else if (result.rows.length === 0) {
      res.status(404).send("Role not found");
    } else {
      res.status(200).send(result.rows[0]);
    }
  });
};

module.exports = getRole;
