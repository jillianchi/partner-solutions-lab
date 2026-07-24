# Partner Solutions Lab

A hands-on lab for building an embedded payment platform with Stripe Connect — and the foundation for a validated Stripe partner solution.

Built by Jillian Chi (Partner SA, SEA) in collaboration with Colin — designed for the Stripe APAC Partner Build Day, Singapore.

---

## What this is

Partner Solutions Lab is a self-serve technical lab for ISV developers and services partners building embedded payment platforms on Stripe. It covers the full stack: connected account onboarding, online payments via Checkout Sessions, in-person payments via Terminal (S710), and webhook-driven reconciliation.

The lab is structured around two real-world scenarios anchored to active Stripe deals in SEA:

| Track | Scenario | Vertical | Reference |
|---|---|---|---|
| A | TableOS — restaurant management SaaS embedding payments for 60+ outlets | F&B | Qlub, StoreHub, Waffle POS |
| B | Kalapa Hotels — boutique hotel group unifying payments across 3 properties | Hospitality | Travelodge Asia, The Ascott |

Completing the lab produces a working embedded payment module and a `DECISIONS.md` — a documented set of architectural decisions that can be reused across client engagements.

---

## Why we built this

Stripe's APAC partner ecosystem needs a repeatable way to ramp ISV and services partners on Connect. Today, partners learn by reading docs or shadowing Stripe SEs — both are slow and don't produce reusable artifacts.

This lab is the co-development pathway for Stripe's **Partner Solutions Program** — partners who complete it leave with a reference implementation that can be submitted toward a Stripe Solutions Validated designation. Validated solutions are listed at [stripe.partners/solutions](https://stripe.partners/solutions) and surfaced to Stripe's internal sales teams.

The Build Day (facilitated, 80 minutes) uses this lab as its scenario brief. The self-serve version allows partners to complete it in 3–4 hours independently.

---

## Current state

This is a working prototype — not yet production-ready. What's built:

- ✅ Full navigation structure (Getting Started → Foundation Concepts → Core Build → Vertical Logic → Solution Pitch)
- ✅ Partner Solutions Program framing and context
- ✅ Architecture Overview with full platform landscape diagram
- ✅ Module 1: Foundation Concepts — Connect architecture, the 5 integration decisions, destination charges, Terminal
- ✅ Module 2: Core Build — task structure with checkpoints
- ✅ Module 3: Track-specific vertical logic (Track A: TableOS F&B, Track B: Kalapa Hotels)
- ✅ Progress tracking (localStorage checkpoints across all modules)
- ✅ Stripe-branded UI, Mermaid diagrams, code blocks with copy
- 🔲 Module 2–4 content needs to be written (task instructions and code snippets)
- 🔲 Starter repo (the Node.js backend partners clone and build on)
- 🔲 Diagrams for L200 (fund flow) and L300 (API sequences) per track

---

## What we're looking for feedback on

1. **Scenarios** — Do TableOS and Kalapa Hotels resonate with the SI partners we're targeting? Are there stronger scenarios from the pipeline?
2. **Scope** — Is the 3-module structure (Foundation → Core → Vertical) the right progression?
3. **Partner Solutions Program framing** — Does the connection to the PSP add enough pull, or is it too much context upfront?
4. **Build Day format** — 80 minutes facilitated vs 3–4 hours self-serve. Which is the primary use case we optimise for?

---

## Running locally

```bash
git clone <repo-url>
cd partner-solutions-lab
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Tech stack

- Vite + React + TypeScript
- Tailwind CSS
- React Router v6
- Mermaid (architecture diagrams)
- highlight.js (code blocks)
- Progress tracking via localStorage (no backend required)

---

## Next steps

1. Write Module 2–4 task content and code snippets
2. Build starter repo (Node.js/Express with stubbed Stripe endpoints)
3. Run Build Day pilot with 2–3 SI partners in Singapore
4. Validate scenario fit against live SFDC pipeline
