# Measurement

**Last verified 2026-08-07.**

The default failure here is reporting noise as a result. Read the sampling
math before designing anything.

---

## 1. The sampling math

For a brand appearing with true probability *p*, standard error at *k* runs
is √(p(1−p)/k). At p ≈ 0.3:

| Runs per prompt | 95% margin |
|---|---:|
| 1 | not measurable |
| 3 | **±52 pp** |
| 20 | ±20 pp |
| 81 | ±10 pp |
| 323 | ±5 pp |

**Three runs cannot distinguish any realistic intervention from noise.**
A single run per prompt is measurement theatre.

**But do not solve it with repeats.** A variance-components decomposition
of 12,933 brand responses found resampling the same prompt past ~5 repeats
reduces relative error variance by a further **0.0003**. Where the variance
actually lives:

| Source | Share |
|---|---:|
| Within-prompt resampling | 34.8% |
| Brand × context | 29.6% |
| Query language | 26.5% |
| Brand × language | 8.6% |
| **Brand identity** | **1.5%** (ICC 0.0146) |

**Reliability comes from breadth: more prompts, more paraphrases, more
engines.** Not more repeats of one prompt.

**Working design:** 150 to 250 prompts × 3 paraphrases × 3 to 5 runs ×
3 to 4 engines. Report the **aggregate rate with a confidence interval**,
never per-prompt presence or absence.

---

## 2. Non-determinism has a mechanical cause

Temperature 0 is not deterministic. 1,000 completions of one prompt at
temperature 0 produced **80 unique outputs**, first divergence at token 103.

Cause: kernels are not batch-invariant. Server load changes batch size,
which changes floating-point reduction order, which flips a token.
**Other people's traffic changes your answer.**

Use this when a client asks why the number moves. It is concrete and it is
not hand-waving.

Observed instability in the wild:
- **~9.2% of AI Mode URLs** persist across three same-day runs on identical
  queries
- Inter-run citation overlap: **67% Perplexity, 49% Claude** [V+]
- Google's AI Overview and Featured Snippet on the **same SERP** contradict
  each other **33%** of the time [P]

---

## 3. Session hygiene, non-negotiable

**Nobody measures a client from their own account.** Memory rewrites the
query. This is documented by OpenAI, and we have reproduced it: the same
prompt in a working account versus a memory-off session returned opposite
results.

| Surface | Use for |
|---|---|
| Provider APIs, fresh sessions | Automated tracking. Relative movement over time |
| Temporary Chat / logged out | Monthly ground truth. What you quote to a client |
| A team member's normal account | **Never.** Guaranteed false positive |

**Geolocation must be controlled or declared.** Location enters as query
text, not as a post-retrieval filter. For local businesses this is not a
detail. Run with and without, report both.

---

## 4. Engines diverge enough that averaging destroys the signal

| Comparison | Overlap |
|---|---:|
| ChatGPT search vs Google organic (top-100 domains) | 25% |
| ChatGPT search vs Google AI Overviews | 24-25% |
| Google AIO vs Google organic | 68% |
| Any LLM engine vs any traditional engine, response level | <40% |
| Google vs AI Mode vs Gemini (same company) | diverge ≥30% |
| Cross-engine retrieved-source Jaccard | **<0.2** |

**Report per engine. Never average.**

Also: Gemini returns no sources on 38% of responses, Grok on 82%.

---

## 5. What every tool misses

**~83% of global AI usage happens inside mobile apps, not browsers.** 75%
in the US.

Every GEO tool, every GA4 property, every referral report, and every
server-log analysis sees browser traffic only. **Standard web measurement
undercounts AI usage by roughly four to five times.**

Disclose this on every traffic claim. Most vendors do not, which makes it a
differentiator as well as an honesty requirement.

Second blind spot: **client-side analytics cannot see AI crawlers at all.**
PostHog, GA4, and every JS tracker fire on a browser event. Crawlers never
run the JavaScript. Server-side middleware tagging is the only way to see
them.

---

## 6. What to build

**Crawler tagging.** ~40 lines of middleware. Match user-agent against an
allowlist, fire-and-forget to the analytics endpoint, synthetic distinct ID
so crawler traffic never creates person profiles. This is the only view of
the leading indicator.

**Citation runs.** Multi-engine via a gateway that exposes native provider
search. Capture three things per run:
1. Was the brand **cited**
2. Was the brand in the **consulted set** (larger than cited, retrievable
   via the sources include option)
3. The **rewritten queries** the model generated

Item 3 is the build queue. The turn where a qualifier surfaces you is the
page to build next.

**Cost reference, 2026-08:** roughly $0.006 to $0.015 per call depending on
engine. 40 prompts × 5 repeats × 3 engines weekly ≈ $30 to $40/month.
Commercial tools charge $82 to $332/month for 50 to 100 single-engine
prompts on a dashboard.

---

## 7. The reporting sequence

Leading to lagging. Do not promise the lagging ones early.

1. **AI crawler hits** on new URLs: days
2. **Consulted-set appearance**: weeks
3. **Citation**: weeks to months
4. **Search impressions**: 1 to 3 weeks behind crawl
5. **Humans arriving from an assistant**: months
6. **Conversations and revenue**: later, and attribution is contaminated
   by AI recommendation reappearing as direct traffic

**Never call a change real until it holds two weeks.**

---

## 8. The number that keeps everyone honest

The one controlled natural experiment on AEO deployment, using treated and
untreated sections of the same domain as contemporaneous controls:

- All pages: **5.7x** monthly growth
- **Untreated control pages: 3.5x**
- **Treatment effect: 1.82x** (95% CI 1.31-2.54)
- **Permutation test: p = 0.16**

Most of what is sold as AEO success is platform growth. A real effect
probably exists, is roughly 1.8x, and is not statistically significant
under a permutation test.

Quote this before a client quotes a vendor case study at you.
