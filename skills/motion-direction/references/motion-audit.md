# Motion Audit (AUDIT_MOTION)

Evaluating motion on a live page. Three intents, one observation protocol, seven scored dimensions, one verdict.

## Intents

1. **Self-audit:** our page against the spec and gates. Output: gate report + fixes ranked by impact.
2. **Competitor read:** what their motion strategy says about their positioning, and where ours should diverge. Output: strategy read + divergence recommendations.
3. **Inspiration mining:** extract reusable moves from a site we admire. Output: PATTERN EXTRACT lines.

Declare the intent before observing; it changes what you record.

## Observation protocol (five passes)

Run all five, in order, before scoring anything.

**Pass 1, Load (0 to 3 seconds).** What animates on arrival, in what order? Does hierarchy arrive correctly (headline before chrome)? Does any motion delay LCP or first read? Is there a loader, and is it earned?

**Pass 2, Scroll.** Slow-scroll the full page once: note every trigger, every scrubbed element, and whether continuous motion shares one clock (the coherence tell: do drifting elements feel like one surface or separate widgets?). Then fast-flick: does velocity look intentional, does anything jank or pop in late?

**Pass 3, Pointer.** Hover every interactive element and any media. Note cursor effects, magnetic behavior, hover reveals. Check: do paired elements move together (gate M8)?

**Pass 4, Reduced motion.** Emulate prefers-reduced-motion (DevTools Command Menu, "Emulate CSS prefers-reduced-motion"). Does content still arrive with hierarchy? Do loops stop? Is anything broken or blank? Also check for pause controls on loops over 5s.

**Pass 5, Performance.** Record a performance trace while scrolling. Note layout/reflow entries during animation, long tasks, dropped frames. Re-test at 4x CPU throttle. On the live DOM, spot-check what properties are actually animated.

## Scoring dimensions (1 to 5 each)

| Dimension | 5 looks like | 1 looks like |
|---|---|---|
| Coherence | one clock, one personality, every beat related | mixed clocks, three energy levels |
| Purpose | every motion has a nameable job | decoration everywhere |
| Signature | one memorable moment tied to the brand claim | zero moments, or five competing |
| Restraint | quiet sections frame the moment | everything animates |
| Craft | timing/easing feel tuned, paired elements unified | default eases, mismatched pairs |
| Performance | steady frames under throttle, composited only | jank, layout thrash |
| Accessibility | designed reduced-motion, pause controls | no reduced-motion handling |

## Verdict

- **SHIP:** no dimension below 3, coherence and accessibility at 4+.
- **NEEDS WORK:** fixable gaps, list them ranked by visitor impact (accessibility and performance first, taste second).
- **REBUILD:** coherence at 1 or 2. Patching incoherence row by row never works; re-run COMPOSE_MOTION.

## Output formats

**Self-audit:**
~~~
MOTION AUDIT: <page> | intent: self
Gates: M1 pass ... M8 fail (drawer/backdrop timing mismatch)
Scores: coherence 4, purpose 3, signature 2, restraint 4, craft 3, performance 5, accessibility 2
VERDICT: NEEDS WORK
Fixes (ranked):
1. <accessibility/perf fixes first>
2. ...
~~~

**Competitor read:** three short paragraphs: what their motion says (personality + budget), what it costs them (weaknesses observed in the five passes), where we should deliberately diverge.

**Inspiration mining:** for each move worth keeping, output a PATTERN EXTRACT block ready for a craft-library intake:
~~~
PATTERN EXTRACT
Name: <move name, generic>
Source: <url> (observed YYYY-MM)
Tags: domain: motion · mood: <personality it fits> · cost: <S/M/L>
What: <2 sentences, the mechanism>
Why it works: <in shared vocabulary: clock, pattern, tokens>
Do not copy: <what should stay at the source>
~~~

## Audit rules

- Observe before judging: complete all five passes before assigning any score.
- Quote evidence: every score below 4 cites a specific observed element.
- Respect intent: inspiration mining does not output a verdict; competitor reads do not output fix lists.
- Never score a site you could not actually observe; say what could not be verified instead of guessing.
