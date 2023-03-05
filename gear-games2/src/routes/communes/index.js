const express = require("express");
const router = express.Router();
const db = require("../db");

// CREATE
router.post("/communes", async (req, res) => {
  try {
    const { name, city_id } = req.body;
    const query =
      "INSERT INTO communes (name, city_id) VALUES ($1, $2) RETURNING *";
    const values = [name, city_id];
    const result = await db.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// READ ALL
router.get("/communes", async (req, res) => {
  try {
    const query = "SELECT * FROM communes";
    const result = await db.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// READ ONE
router.get("/communes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM communes WHERE id = $1";
    const values = [id];
    const result = await db.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).send("Commune not found");
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// UPDATE
router.put("/commune/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, city_id } = req.body;
    const query =
      "UPDATE communes SET name = $1, city_id = $2 WHERE id = $3 RETURNING *";
    const values = [name, city_id, id];
    const result = await db.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).send("Commune not found");
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// DELETE
router.delete("/commune/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM communes WHERE id = $1 RETURNING *";
    const values = [id];
    const result = await db.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).send("Commune not found");
    }
    res.status(200).send("Commune deleted");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
