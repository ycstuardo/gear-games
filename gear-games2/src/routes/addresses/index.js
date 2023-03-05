// Create a new address
app.post(
  "/addresses",
  [
    body("street_name").notEmpty(),
    body("street_number").notEmpty(),
    body("city_id").notEmpty(),
    body("commune_id").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { street_name, street_number, city_id, commune_id, user_id } =
      req.body;

    pool.query(
      "INSERT INTO addresses (street_name, street_number, city_id, commune_id, user_id) VALUES ($1, $2, $3, $4, $5)",
      [street_name, street_number, city_id, commune_id, user_id],
      (error, results) => {
        if (error) {
          res.status(500).send("Internal server error");
        } else {
          res.status(201).send("Address created successfully");
        }
      }
    );
  }
);

// Get all addresses
app.get("/addresses", (req, res) => {
  pool.query("SELECT * FROM addresses", (error, results) => {
    if (error) {
      res.status(500).send("Internal server error");
    } else {
      res.status(200).json(results.rows);
    }
  });
});

// Get a single address by id
app.get("/addresses/:id", (req, res) => {
  const { id } = req.params;

  pool.query(
    "SELECT * FROM addresses WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        res.status(500).send("Internal server error");
      } else {
        if (results.rows.length === 0) {
          res.status(404).send("Address not found");
        } else {
          res.status(200).json(results.rows[0]);
        }
      }
    }
  );
});

// Update an existing address
app.put(
  "/addresses/:id",
  [
    body("street_name").notEmpty(),
    body("street_number").notEmpty(),
    body("city_id").notEmpty(),
    body("commune_id").notEmpty(),
  ],
  (req, res) => {
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { street_name, street_number, city_id, commune_id, user_id } =
      req.body;

    pool.query(
      "UPDATE addresses SET street_name = $1, street_number = $2, city_id = $3, commune_id = $4, user_id = $5 WHERE id = $6",
      [street_name, street_number, city_id, commune_id, user_id, id],
      (error, results) => {
        if (error) {
          res.status(500).send("Internal server error");
        } else {
          if (results.rowCount === 0) {
            res.status(404).send("Address not found");
          } else {
            res.status(200).send("Address updated successfully");
          }
        }
      }
    );
  }
);
