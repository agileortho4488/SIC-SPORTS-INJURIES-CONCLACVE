// POST /api/register — validate, create record (+ Razorpay order when keys present).
const L = require('./_lib');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return L.json(res, 405, { error: 'POST only' });
  try {
    const b = await L.body(req);
    const { name, email, mobile, category, council = '', council_reg_no = '' } = b;
    if (!name || !email || !mobile || !L.CATEGORIES[category]) return L.json(res, 400, { error: 'Missing or invalid fields' });
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return L.json(res, 400, { error: 'Invalid email' });
    if (!/^[0-9+\-\s]{10,15}$/.test(mobile)) return L.json(res, 400, { error: 'Invalid mobile' });
    // Doctors need council details for TSMC CME credit submission
    if (category === 'consultant' && (!council || !council_reg_no)) return L.json(res, 400, { error: 'Medical council name and registration number are required for CME credits' });

    const id = 'SIC' + Date.now().toString(36).toUpperCase() + Math.floor(Math.random() * 900 + 100);
    const amount = L.CATEGORIES[category].amount;

    if (L.TEST_MODE) {
      await L.saveReg({ id, name, email, mobile, category, council, council_reg_no, amount, order_id: 'test', status: 'test' });
      const sig = L.sign(id);
      L.sendMail(email, 'SIC 2027 — registration received (demo)', `<p>Dear ${name}, your demo registration ${id} is recorded. Pass: <a href="https://www.sportsinjuries.care/pass.html?id=${id}&sig=${sig}">view pass</a></p>`);
      return L.json(res, 200, { test: true, id, sig });
    }

    const order = await L.createOrder(amount, id);
    await L.saveReg({ id, name, email, mobile, category, council, council_reg_no, amount, order_id: order.id, status: 'pending' });
    return L.json(res, 200, { id, order_id: order.id, amount, key_id: process.env.RAZORPAY_KEY_ID, name });
  } catch (e) {
    return L.json(res, 500, { error: 'Registration failed. Please try again or email info@precisionortho.care' });
  }
};
