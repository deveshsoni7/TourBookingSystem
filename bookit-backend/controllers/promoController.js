import PromoCode from '../models/PromoCode.js';

export const validatePromo = async (req, res) => {
  const { code } = req.body;
  const promo = await PromoCode.findOne({ code: code.toUpperCase(), isActive: true });
  if (!promo) return res.status(400).json({ valid: false });
  res.json({ valid: true, type: promo.discountType, amount: promo.amount });
};
