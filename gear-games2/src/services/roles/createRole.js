const pool = require("../../database");

const createRole = (req, res) => {
  const newRole = req.body;

  pool.query(
    "INSERT INTO roles (nameRol, permission) VALUES ($1, $2) RETURNING *",
    [newRole.nameRol, newRole.permission],
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send("Error creating new role");
      } else {
        res.status(201).send(result.rows[0]);
      }
    }
  );
};

module.exports = createRole;
