const express = require("express");
const router = express.Router();

const createRole = require("../../services/notes/createRole");
const getRole = require("../../services/notes/getRole");
const getRoles = require("../../services/notes/getRoles");

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: API for managing roles
 */

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Create a new role
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'
 *     responses:
 *       201:
 *         description: Role created successfully
 *       400:
 *         description: Invalid role parameters
 */

router.post("/roles", (req, res) => {
  createRole(req, res);
});

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Retrieve a list of roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: A list of roles
 */
router.get("/roles", (req, res) => {
  getRole(req, res);
});

/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     summary: Retrieve a single role by ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the role to retrieve
 *     responses:
 *       200:
 *         description: A single role
 *       404:
 *         description: Role not found
 */
router.get("/roles/:id", (req, res) => {
  getRoles(req, res);
});

module.exports = router;
