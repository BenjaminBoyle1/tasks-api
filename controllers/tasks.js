const db = require('../db/connect');
const { ObjectId } = require('mongodb');

const COLLECTION = 'tasks';
const toId = (id) => (ObjectId.isValid(id) ? new ObjectId(id) : null);

const getAll = async (req, res) => {
  try {
    const docs = await db.getDb().collection(COLLECTION).find().toArray();
    res.status(200).json(docs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tasks', error: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const _id = toId(req.params.id);
    if (!_id) return res.status(400).json({ message: 'Invalid task id' });

    const doc = await db.getDb().collection(COLLECTION).findOne({ _id });
    if (!doc) return res.status(404).json({ message: 'Task not found' });

    res.status(200).json(doc);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch task', error: err.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, completed = false, notes = '' } = req.body || {};
    if (!title || !title.trim()) return res.status(400).json({ message: 'title is required' });

    const now = new Date();
    const result = await db.getDb().collection(COLLECTION).insertOne({
      title: title.trim(),
      completed: !!completed,
      notes,
      createdAt: now,
      updatedAt: now
    });

    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create task', error: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const _id = toId(req.params.id);
    if (!_id) return res.status(400).json({ message: 'Invalid task id' });

    const { title, completed, notes } = req.body || {};
    const $set = { updatedAt: new Date() };
    if (title !== undefined) {
      if (!title || !title.trim()) return res.status(400).json({ message: 'title cannot be empty' });
      $set.title = title.trim();
    }
    if (completed !== undefined) $set.completed = !!completed;
    if (notes !== undefined) $set.notes = notes;
    if (!Object.keys($set).length) return res.status(400).json({ message: 'No fields provided to update' });

    const r = await db.getDb().collection(COLLECTION).updateOne({ _id }, { $set });
    if (!r.matchedCount) return res.status(404).json({ message: 'Task not found' });

    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: 'Failed to update task', error: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const _id = toId(req.params.id);
    if (!_id) return res.status(400).json({ message: 'Invalid task id' });

    const r = await db.getDb().collection(COLLECTION).deleteOne({ _id });
    if (!r.deletedCount) return res.status(404).json({ message: 'Task not found' });

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete task', error: err.message });
  }
};

module.exports = { getAll, getSingle, createTask, updateTask, deleteTask };
