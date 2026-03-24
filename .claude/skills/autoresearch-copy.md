# Autoresearch: Landing Page Copy Optimizer

Automatically improve landing page copy through iterative testing and refinement. Inspired by Andrej Karpathy's autoresearch method.

## Target

`src/pages/JournalingPage.tsx` — the Empath AI journaling app landing page.

## Product Context

Empath is an AI-powered journaling app. Users journal by calling, texting, WhatsApp, or Telegram — or via the iOS app / web dashboard. Key differentiators:
- Journal via phone call, SMS, WhatsApp, Telegram (no app required)
- AI transcription, mood tracking, pattern recognition
- Therapist connection with pre-session summaries
- Apple Health integration
- HIPAA compliant, end-to-end encrypted
- Free to use

## Quality Checklist

Score every piece of copy against these yes/no questions. Each "yes" = 1 point. Score = (points / total checks) * 100.

### Headline & Hero (score each independently)
1. **Specific outcome?** Does the headline promise a specific, measurable result or relatable outcome — not a vague aspiration like "Transform Your Life"?
2. **Pain point in first line?** Does the subheadline call out a specific pain point the reader recognizes (e.g., "you've tried journaling apps before and quit")?
3. **No buzzwords?** Is the hero free of: revolutionary, cutting-edge, synergy, next-level, game-changing, leverage, unlock, transform, empower, seamless, robust?

### Feature Sections (score each section)
4. **Benefit over feature?** Does each feature headline lead with the benefit to the user, not the technical capability?
5. **Concrete proof?** Does the copy include at least one specific number, example, or scenario (not vague claims like "powerful insights")?
6. **Conversational tone?** Would a real person say this out loud? No corporate speak, no marketing fluff?

### CTAs
7. **Specific verb phrase?** Do CTAs use specific action verbs (not "Learn More", "Get Started", "Click Here")?
8. **Urgency or reason?** Does at least one CTA give a reason to act now?

### Social Proof
9. **Specific details?** Do testimonials mention specific features or outcomes (not just "great app")?

### Overall
10. **Under word budget?** Is each section's copy concise — no section has more than 3 sentences of body text?
11. **No repeated patterns?** Are section structures varied (not every section: badge, headline, paragraph, bullet list)?
12. **Emotional hook?** Does the page make the reader feel something (curiosity, recognition, relief) — not just inform?

## Autoresearch Loop

When invoked, run this loop:

### Step 1: Baseline Score
1. Read `src/pages/JournalingPage.tsx`
2. Extract all user-facing copy (headlines, subheadlines, body text, CTAs, testimonials, FAQ answers)
3. Score each piece against the checklist above
4. Report the baseline score with a breakdown of which checks pass/fail and WHERE

### Step 2: Identify Weakest Area
1. Find the checklist item(s) with the most failures
2. Pick the single highest-impact fix — the one change that would improve the most checks

### Step 3: Make One Change
1. Edit the copy in JournalingPage.tsx — ONE targeted change only
2. The change should be to the TEXT CONTENT only (strings in JSX), not layout/structure/components
3. Keep the same JSX structure, className attributes, and component hierarchy

### Step 4: Re-score
1. Re-read the file after the edit
2. Score again against the full checklist
3. Compare to previous score

### Step 5: Keep or Revert
- If score improved or stayed the same with better quality: **KEEP** the change
- If score decreased: **REVERT** using git checkout on the file, then try a different change

### Step 6: Report & Repeat
1. Log what was changed, why, and whether it was kept or reverted
2. Go back to Step 2 for the next round
3. Stop after:
   - 6 rounds of changes, OR
   - Score hits 90%+ three times in a row, OR
   - User says stop

## Output Format

After each round, report:

```
=== ROUND {n} ===
Score: {previous}% -> {new}%
Change: {what was changed and why}
Result: KEPT / REVERTED
Breakdown:
  [PASS/FAIL] 1. Specific outcome in headline
  [PASS/FAIL] 2. Pain point in first line
  ... (all 12 checks)
```

After all rounds:

```
=== FINAL REPORT ===
Starting score: {x}%
Final score: {y}%
Rounds: {n}
Changes kept: {list with explanations}
Changes reverted: {list with explanations}
```

## Rules
- ONLY change text content (strings). Never change JSX structure, components, classNames, or logic
- ONE change per round. Small, targeted edits only
- Always re-read the file after editing to verify the change was applied correctly
- If a change makes copy worse in ways the checklist doesn't catch (e.g., factually wrong, misleading, breaks meaning), revert it
- Preserve the brand voice: direct, warm, no-nonsense. Not corporate, not overly casual
- Keep phone numbers, URLs, and technical details exactly as they are
