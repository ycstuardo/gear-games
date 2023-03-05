app.get("/users", (req, res) => {
  pool.query("SELECT * FROM users", (error, results) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.status(200).send(results.rows);
    }
  });
});

// GET one user by ID
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  pool.query("SELECT * FROM users WHERE id=$1", [userId], (error, results) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (results.rows.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.status(200).send(results.rows[0]);
    }
  });
});

// POST a new user
app.post("/users", (req, res) => {
  const { name, email, address_id, id_rol } = req.body;
  if (!name || !email || !id_rol) {
    res.status(400).send("Missing required fields");
  } else {
    pool.query(
      "INSERT INTO users (name, email, addreses_id, id_rol) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, address_id, id_rol],
      (error, results) => {
        if (error) {
          res.status(500).send(error.message);
        } else {
          res.status(201).send(results.rows[0]);
        }
      }
    );
  }
});

// PUT or update an existing user by ID
app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const { name, email, address_id, id_rol } = req.body;
  if (!name || !email || !id_rol) {
    res.status(400).send("Missing required fields");
  } else {
    pool.query(
      "UPDATE users SET name=$1, email=$2, addreses_id=$3, id_rol=$4 WHERE id=$5 RETURNING *",
      [name, email, address_id, id_rol, userId],
      (error, results) => {
        if (error) {
          res.status(500).send(error.message);
        } else if (results.rows.length === 0) {
          res.status(404).send("User not found");
        } else {
          res.status(200).send(results.rows[0]);
        }
      }
    );
  }
});
