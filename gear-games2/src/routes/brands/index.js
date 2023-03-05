// GET all brands
router.get("/brands", async (req, res) => {
  try {
    const brands = await pool.query("SELECT * FROM brand");
    res.json(brands.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// GET a brand by id
router.get("/brands/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await pool.query("SELECT * FROM brand WHERE id_brand = $1", [
      id,
    ]);

    if (brand.rows.length === 0) {
      return res.status(404).json({ msg: "Brand not found" });
    }

    res.json(brand.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// CREATE a brand
router.post("/brands", async (req, res) => {
  try {
    const { brandName } = req.body;
    const newBrand = await pool.query(
      "INSERT INTO brand (brandName) VALUES ($1) RETURNING *",
      [brandName]
    );
    res.json(newBrand.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// UPDATE a brand
router.put("/brands/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { brandName } = req.body;
    const updatedBrand = await pool.query(
      "UPDATE brand SET brandName = $1 WHERE id_brand = $2 RETURNING *",
      [brandName, id]
    );

    if (updatedBrand.rows.length === 0) {
      return res.status(404).json({ msg: "Brand not found" });
    }

    res.json(updatedBrand.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// DELETE a brand
router.delete("/brands/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBrand = await pool.query(
      "DELETE FROM brand WHERE id_brand = $1 RETURNING *",
      [id]
    );

    if (deletedBrand.rows.length === 0) {
      return res.status(404).json({ msg: "Brand not found" });
    }

    res.json({ msg: "Brand deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
