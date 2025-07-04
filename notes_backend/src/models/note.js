const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

// PUBLIC_INTERFACE
class Note extends Model {
  /** Represents a user's note for CRUD operations. */
}

/** 
 * Note schema:
 * - id (integer, auto-increment, primary)
 * - title (string, required)
 * - content (text, required)
 * - createdAt (date string, auto)
 * - updatedAt (date string, auto)
 */
Note.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      description: 'Unique identifier for the note'
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      description: 'Title of the note'
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      description: 'Content/body of the note'
    }
  },
  {
    sequelize,
    modelName: 'Note',
    timestamps: true // createdAt and updatedAt
  }
);

module.exports = Note;
