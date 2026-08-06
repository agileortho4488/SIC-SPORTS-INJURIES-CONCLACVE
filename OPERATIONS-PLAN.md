# SIC 2027 — Automated Delegate Operations Plan

How the conference runs itself: every stage of the delegate lifecycle, what is sent
automatically, and which system does it. Researched against Indian platform capabilities
(KonfHub) and standard congress operations.

## The delegate lifecycle (the flow)

```
DISCOVER          →  REGISTER            →  NURTURE               →  ATTEND              →  AFTER
website/poster       KonfHub event page     automated campaigns      QR pass check-in       certificates
priority list        payment + GST          brochure release         badge print            feedback
                     PG cert upload         reminders                session scanning       database
```

### Stage 1 — Discover (live today)
- Website (this repo) + poster → priority-list form (FormSubmit → info@agileortho.in).
- Priority list gets the registration link before public announcement.

### Stage 2 — Register (KonfHub event page)
Delegate picks category → pays (UPI/card/netbanking, GST invoice auto-generated) →
**instant automated confirmation by email + WhatsApp** (KonfHub, India-only feature).
Custom fields configured at setup:
- State medical council name + registration number  ← required for TSMC CME credits
- Mobile number (TSMC requirement)
- PG students: HOD certificate upload + approval-based registration (organizer approves)
Database: KonfHub attendee dashboard, exportable to Excel anytime — this IS the
delegate database; no separate system to maintain.

### Stage 3 — Nurture (automated campaigns from KonfHub)
Scheduled once, sent automatically (email + SMS + WhatsApp, unlimited on plan):
- T+0: confirmation + receipt (automatic)
- Monthly: program/faculty announcements as they land
- **Brochure release: campaign to all registrants + download link on website**
- T-30 days: early-bird closing reminder to non-registered priority list
- T-7: venue, parking, agenda + **QR pass reminder**
- T-1: final joining instructions
Queries: three-layer handling (see below).

### Stage 4 — Attend (QR pass + check-in)
- Every registrant automatically holds a **QR-coded pass** (downloadable from
  confirmation email / KonfHub app).
- On-site: **KonfHub Check-In App** scans the QR → instant check-in, no queues;
  optional badge/lanyard printing at desk; optional per-session scanning for
  workshop entry. Attendance log = exportable per-delegate record.
- Attendance record drives BOTH the TSMC credit submission and certificates.

### Stage 5 — After (automatic close-out)
- **Certificates: KonfHub auto-issues participation certificates** — recommended
  trigger: after delegate submits the feedback form (built-in incentive loop).
  Certificate artwork: upload our template (certificate-template.html design)
  with name merge-field; CME ref number added once TSMC approval letter arrives.
- Delegate list + attendance + council reg numbers → exported → submitted to TSMC.
- Full database retained in KonfHub + Excel export archived by the secretariat.

## Query handling (the "automatic answers" layer)

Tier 1 (launch now): FAQ section on the website — answers 80% (dates, venue, CME,
fees, refunds, abstracts). Zero cost.
Tier 2 (registration opens): WhatsApp Business number for the secretariat with
auto-greeting + away message + quick replies for the top questions. Free app.
Tier 3 (optional, later): AI chat on the site trained on the FAQ. Only worth it
if query volume actually hurts; revisit at T-60 days.

## Who does what

| Requirement (yours)                  | System                              | Setup owner |
|--------------------------------------|-------------------------------------|-------------|
| Registration + database              | KonfHub event page                  | Committee opens account; site links to it |
| Automated mails/SMS/WhatsApp         | KonfHub campaigns                   | Configure once at event setup |
| Query auto-answering                 | Site FAQ + WhatsApp Business        | FAQ: site (done when approved); WA: secretariat phone |
| Brochure distribution                | KonfHub campaign + site download    | Upload PDF when designed |
| Pass + QR + scanning                 | KonfHub ticket QR + Check-In App    | Automatic; volunteers get the app on-site |
| Certificates, automatic              | KonfHub certificate module          | Upload template + set feedback trigger |
| CME submission to TSMC               | Export from KonfHub                 | Secretariat, before + after event |

## Costs (indicative, verify at signup)
KonfHub: no subscription; ~₹10/attendee platform fee + payment-gateway charges
(~2%) + 18% GST on fees. For a few hundred delegates this is a few thousand
rupees — vs a six-week custom build with payment-compliance risk. Do not self-build.

## Setup order
1. Register domain (sic2027.in) — still first.
2. Open KonfHub organizer account (GST + bank details needed).
3. Create event: categories per /registration.html, custom CME fields, PG approval flow.
4. Committee approves fees → flip /registration.html live, buttons → KonfHub URL.
5. Configure campaign calendar (Stage 3 above) in one sitting.
6. Upload certificate template; set feedback→certificate trigger.
7. On-site: 2–3 volunteers with the Check-In App; one badge printer (optional).
