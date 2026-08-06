# SIC 2027 — Launch Checklist

Everything staged and what remains to flip each piece live.
Live site: https://sic-sports-injuries-conclacve.vercel.app · Repo: agileortho4488/SIC-SPORTS-INJURIES-CONCLACVE

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

- Registration page form posts to FormSubmit → info@agileortho.in.
- **ACTION (one-time):** submit the form once yourself; FormSubmit emails a confirmation link to info@agileortho.in — click it to activate. After that every submission arrives by email.
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
