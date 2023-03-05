// GET all categories
app.get("/categories", (req, res) => {
  pool.query("SELECT * FROM categories", (error, results) => {
    if (error) {
      res.status(500).json({ message: "Internal server error" });
    } else {
      res.status(200).json(results.rows);
    }
  });
});

// GET a category by ID
app.get("/categories/:id", (req, res) => {
  const id = req.params.id;
  pool.query(
    "SELECT * FROM categories WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        res.status(500).json({ message: "Internal server error" });
      } else if (results.rows.length === 0) {
        res.status(404).json({ message: `Category with ID ${id} not found` });
      } else {
        res.status(200).json(results.rows[0]);
      }
    }
  );
});

// CREATE a new category
app.post("/categories", (req, res) => {
  const { categoryName } = req.body;
  if (!categoryName) {
    res.status(400).json({ message: "categoryName is required" });
  } else {
    pool.query(
      "INSERT INTO categories (categoryName) VALUES ($1) RETURNING *",
      [categoryName],
      (error, results) => {
        if (error) {
          res.status(500).json({ message: "Internal server error" });
        } else {
          res.status(201).json(results.rows[0]);
        }
      }
    );
  }
});

// UPDATE an existing category
app.put("/categories/:id", (req, res) => {
  const id = req.params.id;
  const { categoryName } = req.body;
  if (!categoryName) {
    res.status(400).json({ message: "categoryName is required" });
  } else {
    pool.query(
      "UPDATE categories SET categoryName = $1 WHERE id = $2 RETURNING *",
      [categoryName, id],
      (error, results) => {
        if (error) {
          res.status(500).json({ message: "Internal server error" });
        } else if (results.rows.length === 0) {
          res.status(404).json({ message: `Category with ID ${id} not found` });
        } else {
          res.status(200).json(results.rows[0]);
        }
      }
    );
  }
});

// DELETE an existing category
app.delete("/categories/:id", (req, res) => {
  const id = req.params.id;
  pool.query(
    "DELETE FROM categories WHERE id = $1 RETURNING *",
    [id],
    (error, results) => {
      if (error) {
        res.status(500).json({ message: "Internal server error" });
      } else if (results.rows.length === 0) {
        res.status(404).json({ message: `Category with ID ${id} not found` });
      } else {
        res.status(204).end();
      }
    }
  );
});
