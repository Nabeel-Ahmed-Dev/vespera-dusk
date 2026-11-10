# Vespera Dusk — Workflow

Local-only git for now (no remote). One step = one branch = one reviewable change. Small commits. Human approves before merge.

## Roles

| Role | Who | Responsibility |
|---|---|---|
| **Approver / CEO** | Nabeel | Final yes/no. Merges to `main` **only** on explicit OK. |
| **Technical Project Manager** | Orchestrator | Writes step briefs, reviews diffs, browser-QA, recommends approve/reject. |
| **Developer** | Cursor agent | Implements **only** the current step brief. Does not expand scope, bump locked versions, or merge. |

## Per-step loop

1. **Brief** — PM writes / points at `docs/briefs/step-NN-*.md` (scope, out-of-scope, acceptance, verify).
2. **Branch** — Developer creates `step-NN-slug` from up-to-date `main` (e.g. `step-02-tokens-fonts-content`).
3. **Implement** — Small, focused commits on that branch only. No drive-by refactors. No UI in a docs step; no motion in a layout step.
4. **Gate** — `pnpm lint && pnpm build` must pass before review.
5. **PM review** — Diff against `main` + browser check for user-visible steps.
6. **Nabeel approval** — Explicit OK required.
7. **Merge** — Merge branch into `main` only after that OK. Delete branch when done.

## Discipline

- Follow `docs/plan.md` order; do not start step N+1 until step N is merged.
- Prefer `design-handoff/` over live Figma when quota is exhausted.
- Read `AGENTS.md` before Next.js API usage — this Next version may differ from training data.
- Cursor rules in `.cursor/rules/` are binding for the agent.
- Do not touch locked package versions unless a brief explicitly says so.

## Verification baseline

```bash
pnpm lint && pnpm build
```

Browser checks are required for any step that changes rendered UI or motion.
