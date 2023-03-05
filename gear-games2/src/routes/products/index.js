// Get all communes
router.get("/communes", async (req, res) => {
  try {
    const communes = await pool.query("SELECT * FROM communes");
    res.json(communes.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Get a single commune
router.get("/communes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const commune = await pool.query("SELECT * FROM communes WHERE id = $1", [
      id,
    ]);
    res.json(commune.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Create a commune
router.post("/communes", async (req, res) => {
  const { name, city_id } = req.body;
  try {
    const newCommune = await pool.query(
      "INSERT INTO communes (name, city_id) VALUES ($1, $2) RETURNING *",
      [name, city_id]
    );
    res.json(newCommune.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Update a commune
router.put("/communes/:id", async (req, res) => {
  const { id } = req.params;
  const { name, city_id } = req.body;
  try {
    const updatedCommune = await pool.query(
      "UPDATE communes SET name = $1, city_id = $2 WHERE id = $3",
      [name, city_id, id]
    );
    res.json("Commune was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

// Delete a commune
router.delete("/communes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCommune = await pool.query(
      "DELETE FROM communes WHERE id = $1",
      [id]
    );
    res.json("Commune was deleted!");
  } catch (err) {
    console.error(err.message);
  }
});
