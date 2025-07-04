const noteService = require('../services/note');

// PUBLIC_INTERFACE
class NoteController {
  /**
   * Create a new note
   * @swagger
   * /notes:
   *   post:
   *     summary: Create a new note
   *     tags: [Notes]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - title
   *               - content
   *             properties:
   *               title:
   *                 type: string
   *                 description: Note title
   *               content:
   *                 type: string
   *                 description: Note content
   *     responses:
   *       201:
   *         description: Note created successfully
   *       400:
   *         description: Invalid request
   */
  async create(req, res, next) {
    try {
      const { title, content } = req.body;
      if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
      }
      const note = await noteService.createNote({ title, content });
      return res.status(201).json(note);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Get all notes
   * @swagger
   * /notes:
   *   get:
   *     summary: Get all notes
   *     tags: [Notes]
   *     responses:
   *       200:
   *         description: List of notes
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Note'
   */
  async getAll(req, res, next) {
    try {
      const notes = await noteService.getAllNotes();
      return res.status(200).json(notes);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Get a note by id
   * @swagger
   * /notes/{id}:
   *   get:
   *     summary: Get note by id
   *     tags: [Notes]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Note ID
   *     responses:
   *       200:
   *         description: Note found
   *       404:
   *         description: Note not found
   */
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const note = await noteService.getNoteById(id);
      if (!note) return res.status(404).json({ message: 'Note not found' });
      return res.status(200).json(note);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Update a note by id
   * @swagger
   * /notes/{id}:
   *   put:
   *     summary: Update a note by id
   *     tags: [Notes]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Note ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               title:
   *                 type: string
   *               content:
   *                 type: string
   *     responses:
   *       200:
   *         description: Note updated successfully
   *       400:
   *         description: Invalid request
   *       404:
   *         description: Note not found
   */
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      if (!title && !content) {
        return res.status(400).json({ message: 'Either title or content must be provided' });
      }
      const payload = {};
      if (title) payload.title = title;
      if (content) payload.content = content;
      const note = await noteService.updateNote(id, payload);
      if (!note) return res.status(404).json({ message: 'Note not found' });
      return res.status(200).json(note);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Delete a note by id
   * @swagger
   * /notes/{id}:
   *   delete:
   *     summary: Delete a note by id
   *     tags: [Notes]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Note ID
   *     responses:
   *       204:
   *         description: Note deleted successfully
   *       404:
   *         description: Note not found
   */
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const success = await noteService.deleteNote(id);
      if (!success) return res.status(404).json({ message: 'Note not found' });
      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new NoteController();
