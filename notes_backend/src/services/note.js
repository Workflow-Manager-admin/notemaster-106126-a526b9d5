const Note = require('../models/note');

// PUBLIC_INTERFACE
class NoteService {
  /** Creates a new note. */
  async createNote(data) {
    return Note.create(data);
  }

  /** Retrieves all notes or a note by ID. */
  async getAllNotes() {
    return Note.findAll({ order: [['createdAt', 'DESC']] });
  }

  /** Gets a note by id */
  async getNoteById(id) {
    return Note.findByPk(id);
  }

  /** Updates a note by id */
  async updateNote(id, data) {
    const note = await Note.findByPk(id);
    if (!note) return null;
    await note.update(data);
    return note;
  }

  /** Deletes a note by id */
  async deleteNote(id) {
    const note = await Note.findByPk(id);
    if (!note) return null;
    await note.destroy();
    return true;
  }
}

module.exports = new NoteService();
