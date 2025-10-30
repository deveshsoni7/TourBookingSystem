import Experience from '../models/Experience.js';

export const listExperiences = async (req, res) => {
  try {
    const exps = await Experience.find();
    res.json(exps);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getExperienceById = async (req, res) => {
  try {
    const exp = await Experience.findById(req.params.id);
    if (!exp) return res.status(404).json({ error: "Experience not found" });
    res.json(exp);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
