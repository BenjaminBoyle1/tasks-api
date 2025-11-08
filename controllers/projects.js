// controllers/projects.js (no ownerId filtering)
const db = require('../db/connect');
const { ObjectId } = require('mongodb');

const COLLECTION = 'projects';
const toId = (id) => (ObjectId.isValid(id) ? new ObjectId(id) : null);

const getAll = async (_req, res) => {
  try {
    const docs = await db.getDb().collection(COLLECTION).find({}).toArray();
    res.status(200).json(docs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch projects', error: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const _id = toId(req.params.id);
    if (!_id) return res.status(400).json({ message: 'Invalid project id' });

    const doc = await db.getDb().collection(COLLECTION).findOne({ _id });
    if (!doc) return res.status(404).json({ message: 'Project not found' });

    res.status(200).json(doc);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch project', error: err.message });
  }
};

const createProject = async (req, res) => {
  try {
    const {
      name,
      description = '',
      status = 'planned',
      priority = 3,
      dueDate = null,
      tags = [],
      budget = 0
    } = req.body || {};

    const now = new Date();
    const doc = {
      name: name.trim(),
      description,
      status,
      priority: Number(priority),
      dueDate: dueDate ? new Date(dueDate) : null,
      tags,
      budget: Number(budget),
      createdAt: now,
      updatedAt: now
    };

    const result = await db.getDb().collection(COLLECTION).insertOne(doc);
    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create project', error: err.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const _id = toId(req.params.id);
    if (!_id) return res.status(400).json({ message: 'Invalid project id' });

    const { name, description, status, priority, dueDate, tags, budget } = req.body || {};
    const $set = { updatedAt: new Date() };

    if (name !== undefined) $set.name = name.trim();
    if (description !== undefined) $set.description = description;
    if (status !== undefined) $set.status = status;
    if (priority !== undefined) $set.priority = Number(priority);
    if (dueDate !== undefined) $set.dueDate = dueDate ? new Date(dueDate) : null;
    if (tags !== undefined) $set.tags = tags;
    if (budget !== undefined) $set.budget = Number(budget);

    const r = await db.getDb().collection(COLLECTION).updateOne({ _id }, { $set });
    if (!r.matchedCount) return res.status(404).json({ message: 'Project not found' });

    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: 'Failed to update project', error: err.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const _id = toId(req.params.id);
    if (!_id) return res.status(400).json({ message: 'Invalid project id' });

    const r = await db.getDb().collection(COLLECTION).deleteOne({ _id });
    if (!r.deletedCount) return res.status(404).json({ message: 'Project not found' });

    res.status(200).json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete project', error: err.message });
  }
};

module.exports = { getAll, getSingle, createProject, updateProject, deleteProject };
