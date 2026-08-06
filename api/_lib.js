// SIC 2027 registration system — shared lib.
// Storage: Postgres when POSTGRES_URL is set (Vercel/Neon/E2E — any Postgres),
// else a JSON file store (DEMO ONLY: ephemeral on Vercel, fine locally).
const crypto = require('crypto');
const fs = require('fs');

// PLACEHOLDER FEES (paise) — COMMITTEE TO SET before going live. Draft page is noindex.
const CATEGORIES = {
  consultant: { label: 'Consultant / Specialist', amount: 500000 },
  pg:         { label: 'PG Student',              amount: 300000 },
  physio:     { label: 'Physiotherapist / Allied', amount: 250000 },
  companion:  { label: 'Accompanying Person',      amount: 200000 },
};

const SECRET = process.env.PASS_SECRET || 'sic2027-dev-secret-not-for-production';
const TEST_MODE = !process.env.RAZORPAY_KEY_ID;

const sign = id => crypto.createHmac('sha256', SECRET).update(String(id)).digest('hex').slice(0, 16);
const verifySig = (id, sig) => {
  const a = Buffer.from(sign(id)), b = Buffer.from(String(sig || ''));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
};

// ── storage adapter ──────────────────────────────────────────
const FILE = process.env.VERCEL ? '/tmp/sic-demo.json' : require('path').join(__dirname, '..', '.data.json');
const usePg = !!process.env.POSTGRES_URL;
let pg = null;
async function db() {
  if (!usePg) return null;
  if (!pg) {
    pg = require('@vercel/postgres');
    await pg.sql`CREATE TABLE IF NOT EXISTS registrations (
      id TEXT PRIMARY KEY, name TEXT, email TEXT, mobile TEXT, category TEXT,
      council TEXT, council_reg_no TEXT, amount INT, order_id TEXT, payment_id TEXT,
      status TEXT, created_at TIMESTAMPTZ DEFAULT now(), checked_in_at TIMESTAMPTZ
    )`;
    await pg.sql`CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY, name TEXT, email TEXT, mobile TEXT, category TEXT,
      source TEXT, created_at TIMESTAMPTZ DEFAULT now()
    )`;
  }
  return pg;
}
const fileRead = () => { try { return JSON.parse(fs.readFileSync(FILE, 'utf8')); } catch { return {}; } };
const fileWrite = d => fs.writeFileSync(FILE, JSON.stringify(d));

async function saveReg(rec) {
  const p = await db();
  if (p) {
    await p.sql`INSERT INTO registrations (id,name,email,mobile,category,council,council_reg_no,amount,order_id,status)
      VALUES (${rec.id},${rec.name},${rec.email},${rec.mobile},${rec.category},${rec.council},${rec.council_reg_no},${rec.amount},${rec.order_id},${rec.status})`;
  } else {
    const d = fileRead(); d[rec.id] = { ...rec, created_at: new Date().toISOString() }; fileWrite(d);
  }
}
async function updateReg(id, fields) {
  const p = await db();
  if (p) {
    if ('status' in fields) await p.sql`UPDATE registrations SET status=${fields.status}, payment_id=${fields.payment_id || null} WHERE id=${id}`;
    if ('checked_in_at' in fields) await p.sql`UPDATE registrations SET checked_in_at=${fields.checked_in_at} WHERE id=${id}`;
  } else {
    const d = fileRead(); if (d[id]) { Object.assign(d[id], fields); fileWrite(d); }
  }
}
async function getReg(id) {
  const p = await db();
  if (p) { const r = await p.sql`SELECT * FROM registrations WHERE id=${id}`; return r.rows[0] || null; }
  return fileRead()[id] || null;
}
async function saveLead(rec) {
  const p = await db();
  if (p) {
    await p.sql`INSERT INTO leads (id,name,email,mobile,category,source)
      VALUES (${rec.id},${rec.name},${rec.email},${rec.mobile},${rec.category},${rec.source})`;
  } else {
    const d = fileRead(); (d.__leads = d.__leads || []).push({ ...rec, created_at: new Date().toISOString() }); fileWrite(d);
  }
}
async function allLeads() {
  const p = await db();
  if (p) { const r = await p.sql`SELECT * FROM leads ORDER BY created_at`; return r.rows; }
  return fileRead().__leads || [];
}

async function allRegs() {
  const p = await db();
  if (p) { const r = await p.sql`SELECT * FROM registrations ORDER BY created_at`; return r.rows; }
  return Object.values(fileRead());
}

// ── razorpay (REST, no SDK) ──────────────────────────────────
async function createOrder(amount, receipt) {
  const auth = Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString('base64');
  const res = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, currency: 'INR', receipt }),
  });
  if (!res.ok) throw new Error('razorpay order failed: ' + await res.text());
  return res.json();
}
function verifyRazorpaySignature(orderId, paymentId, signature) {
  const expect = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`).digest('hex');
  return expect === signature;
}

// ── email (Resend, optional) ─────────────────────────────────
async function sendMail(to, subject, html) {
  if (!process.env.RESEND_API_KEY) return false;
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: process.env.MAIL_FROM || 'SIC 2027 <onboarding@resend.dev>', to, subject, html }),
  }).catch(() => {});
  return true;
}

function json(res, code, obj) { res.statusCode = code; res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(obj)); }
async function body(req) {
  if (req.body) return typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  let s = ''; for await (const c of req) s += c; return s ? JSON.parse(s) : {};
}

module.exports = { CATEGORIES, TEST_MODE, sign, verifySig, saveReg, updateReg, getReg, allRegs, saveLead, allLeads, createOrder, verifyRazorpaySignature, sendMail, json, body };
