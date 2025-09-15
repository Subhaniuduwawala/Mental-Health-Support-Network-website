const express = require("express");
const Counselor = require("../models/Counselor");
const requireAdmin = require("../middleware/requireAdmin");

const router = express.Router();

// LIST (with simple filters + pagination)
router.get("/", async (req, res) => {
  try {
    const { q, category, language, minRating, page = 1, limit = 12, sort = "createdAt" } = req.query;

    const filter = { isActive: true };
    if (category) filter.category = category;
    if (language) filter.languages = { $in: [language] };
    if (minRating) filter.rating = { $gte: Number(minRating) };

    let query = Counselor.find(filter);
    if (q) query = query.find({ $text: { $search: q } });

    const total = await Counselor.countDocuments(query.getFilter());
    const items = await query.sort(sort).skip((page - 1) * limit).limit(Number(limit)).lean();

    res.json({ page: Number(page), total, items });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// READ one
router.get("/:id", async (req, res) => {
  const doc = await Counselor.findById(req.params.id).lean();
  if (!doc) return res.status(404).json({ error: "Not found" });
  res.json(doc);
});

// CREATE (admin)
router.post("/", requireAdmin, async (req, res) => {
  try {
    const body = { ...req.body };
    if (typeof body.languages === "string") body.languages = body.languages.split(",").map(s=>s.trim()).filter(Boolean);
    if (typeof body.approach  === "string") body.approach  = body.approach.split(",").map(s=>s.trim()).filter(Boolean);
    if (body.experienceYears !== undefined) body.experienceYears = Number(body.experienceYears) || 0;
    if (body.rating !== undefined) body.rating = Number(body.rating) || 4;

    const created = await Counselor.create(body);
    res.status(201).json(created);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// UPDATE (admin)
router.patch("/:id", requireAdmin, async (req, res) => {
  try {
    const body = { ...req.body };
    if (typeof body.languages === "string") body.languages = body.languages.split(",").map(s=>s.trim()).filter(Boolean);
    if (typeof body.approach  === "string") body.approach  = body.approach.split(",").map(s=>s.trim()).filter(Boolean);
    if (body.experienceYears !== undefined) body.experienceYears = Number(body.experienceYears);
    if (body.rating !== undefined) body.rating = Number(body.rating);

    const updated = await Counselor.findByIdAndUpdate(req.params.id, body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// DELETE (admin)
router.delete("/:id", requireAdmin, async (req, res) => {
  const removed = await Counselor.findByIdAndDelete(req.params.id);
  if (!removed) return res.status(404).json({ error: "Not found" });
  res.json({ ok: true });
});

module.exports = router;
