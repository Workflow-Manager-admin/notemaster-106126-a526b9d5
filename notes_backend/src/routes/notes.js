const express = require('express');
const noteController = require('../controllers/note');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: API endpoints to manage notes (CRUD)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Note:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/* CRUD endpoints */
router.post('/', noteController.create.bind(noteController));
router.get('/', noteController.getAll.bind(noteController));
router.get('/:id', noteController.getById.bind(noteController));
router.put('/:id', noteController.update.bind(noteController));
router.delete('/:id', noteController.delete.bind(noteController));

module.exports = router;
