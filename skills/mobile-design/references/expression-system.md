# Expression System

Expression is what earns the "award" read, but it's the last 10%, not the first. The whole kit's premise: **a calm systematic base plus one or two deliberate expressive moments.** Most apps fail by sprinkling expression everywhere, which flattens the hierarchy expression is supposed to create. This file rations it.

## The budget rule

**One signature moment per app, not per screen.** A signature moment is a branded, memorable beat that is a genuine product differentiator. The rest of the UI stays functional and calm so that moment lands. Two competing signature moments cancel each other out. (Mirror of the motion-direction budget rule, applied to static design.)

A second, lesser expressive beat is allowed only if it serves a different emotional job and never competes with the first.

## Clarity gates expression (the hard rule)

> No amount of emotion compensates for a lack of clarity.

Every expressive choice must pass: does it keep the label, the hierarchy, and the primary action at least as clear as the calm version? If expression removes a label, breaks a platform convention, or buries the action, it fails. Revert it. Research backs this: expressive designs help users find key elements *faster* only when clarity is preserved; when it isn't, expression actively hurts.

## Where the signature moment goes

Pick the highest-emotion point of the product, usually one of:
- **First run**: the welcome or the first "aha" after setup.
- **A reward**: a streak hit, a goal completed, a milestone (the celebratory moment).
- **The home hero**: the one surface every session passes through.
- **The core-loop payoff**: the moment the product's value becomes visible.

One of these gets pushed. The settings screen, the form, the list: these stay calm. Calm everywhere else is what makes the one moment premium.

## The five levers (vary one or two, never all)

Expression has five dials; a signature moment turns **one or two**, not all five:

1. **Color**: a richer brand wash, a gradient, a saturated accent for this moment only.
2. **Shape**: oversized radii, a distinctive silhouette, a shape that morphs between states.
3. **Size**: display type at a scale that owns the screen; an oversized hero number.
4. **Motion**: a spring, a reveal, a celebratory beat (the *slot* is reserved here; `mobile-motion` implements).
5. **Containment**: glass/material, a floating panel, a bold band that frames the moment.

Turning all five at once is noise. The discipline is choosing which one or two carry the feeling.

## Material expression, with discipline

- **iOS Liquid Glass:** an expressive material, but chrome-only (see `platform-fit.md`). It can *be* the signature treatment on a floating control, never on content.
- **Android M3 Expressive:** shape morphing and bold color/size are first-class expression levers. Use them to carry hierarchy at the one moment, not to decorate every card.

## Output: the expression budget

In EXPRESS, state it plainly:

~~~
EXPRESSION BUDGET: [app]
SIGNATURE MOMENT: [the one surface] ([why it earns the push])
LEVERS: [1–2 of: color / shape / size / motion / containment]
JOB: [what feeling it earns or info it carries]
MOTION SLOT: [reserved for mobile-motion: what + where, or none]
EVERYWHERE ELSE: calm, functional, systematic, no competing flourish.
~~~

## What `mobile-audit` checks here (D7)

More than one signature moment; a flourish with no stated job; expression that removed a label or buried the primary action; all-five-levers-at-once noise; brand color/gradient used expressively on more than the one moment.
