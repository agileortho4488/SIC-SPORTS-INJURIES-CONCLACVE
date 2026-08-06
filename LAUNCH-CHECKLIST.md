# SIC 2027 — Launch Checklist

Everything staged and what remains to flip each piece live.
Live site: https://www.sportsinjuries.care · Repo: agileortho4488/SIC-SPORTS-INJURIES-CONCLACVE

## Staged pages (built, unlisted, `noindex`, draft-banner)

| Page | URL | To go live |
|---|---|---|
| Registration | `/registration.html` | Committee fills fees + early-bird date, remove draft strip + noindex, link from nav |
| Abstracts | `/abstracts.html` | Set deadlines + portal link, remove draft strip + noindex, link from nav |
| Program | `/program.html` | Scientific committee fills session grid, same flip |
| Exhibitors | `/exhibitors.html` | **Already public** |
| Certificate | `/certificate-template.html` | Post-conference: fill name/reg-no/CME ref per delegate, print to PDF |

Flip = delete the `.draft-strip` div + `<meta name="robots">` line, add nav link on index.html. One commit, auto-deploys.

## Forms (priority list / enquiries)

- Registration page form posts to FormSubmit → info@precisionortho.care.
- **ACTION (one-time):** submit the form once yourself; FormSubmit emails a confirmation link to info@precisionortho.care — click it to activate. After that every submission arrives by email.
- Upgrade path when volume grows: Google Sheet via Apps Script, or Konfhub's own lead forms.

## Payment / registration engine — DO NOT self-build

Per project plan: use **Konfhub** (or Explara/Townscript). Payment gateway + GST invoicing + refunds + PG-certificate uploads are their compliance burden, not yours.
Konfhub setup needs: organizer account, GST details, bank account, event page (reuse site copy), ticket categories mirroring `/registration.html` table, PG-certificate upload field, **custom fields: state medical council + registration number + mobile (required for TSMC credits)**.
When live: the "registration opens" buttons across the site point to the Konfhub event URL.

## TSMC CME (do early — affects registration form)

- Delegate list with **medical council registration numbers + registered mobile numbers** must be submitted to TSMC in advance (their current rule).
- Download and file the organizer **Declaration Proforma** from onlinetsmc.in.
- Keep every public mention as "APPLIED" until TSMC approval letter arrives; then update site + certificate template with approval/ref number and credit count.

## Still pending (business, not code)

1. **Domain** — register sic2027.in (+ .com); attach in Vercel → Settings → Domains; put URL on next poster print.
2. **Poster/site color alignment** — poster is lime, site is navy/gold. Pick one before the next print run.
3. **Hero media** — current photo/video are AI placeholders with green lighting; replace with an Apollo shoot or regenerate when credits allow.
4. **Faculty page** — build when 15–20 names confirmed (copy exhibitors.html structure).
5. **Doctor bios** — each committee member should confirm their credentials paragraph on the site.

## Custom registration system (BUILT — demo mode live)

Self-hosted alternative to KonfHub, running as Vercel serverless functions.
Flow: /register-live.html → /api/register → Razorpay checkout → /api/verify →
email + /pass.html (QR) → /checkin.html scanner → /api/checkin → /certificate.html
→ /api/export?key= (TSMC delegate CSV).

**Demo mode** is active until env vars are set (no payment, instant pass, PIN 2027,
export key "demo"). Storage falls back to an ephemeral file until Postgres is attached —
attach a DB before real use.

### Go-live env vars (Vercel → Project → Settings → Environment Variables)
| Var | What |
|---|---|
| POSTGRES_URL | Attach Vercel Postgres (free) in one click — or any Postgres (e.g. on E2E Networks for India data residency) |
| RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET | From Razorpay dashboard after GST/KYC. Presence of KEY_ID switches off demo mode |
| PASS_SECRET | Long random string — signs pass QR codes |
| STAFF_PIN | Check-in PIN for volunteers |
| ADMIN_KEY | Protects /api/export |
| RESEND_API_KEY + MAIL_FROM | Resend.com account (free 100 mails/day) for confirmation emails |
| SITE_URL | https://final-domain once attached |
| CERTS_ENABLED=1 + CME_LINE | Flip after conclave, once TSMC approval letter arrives |

### Fees
Placeholder amounts live in api/_lib.js CATEGORIES and register-live.html FEES —
update BOTH when the committee approves real fees.

### Honest limitations vs KonfHub (revisit before committing)
- No WhatsApp/SMS campaigns (email only, via Resend)
- No PG certificate upload (verified at desk instead)
- No refund automation (manual via Razorpay dashboard per policy)
- No badge printing integration
- You own uptime, bugs and payment disputes. KonfHub remains the lower-risk option;
  this system is fully built and yours if you prefer it.
