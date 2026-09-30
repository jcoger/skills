# Claims Ledger

**Last verified 2026-08-07.** Grades: [P] peer-reviewed · [R] credible
preprint · [V+] vendor with disclosed method · [V] vendor marketing ·
[D] primary engine documentation · [X] unsourced.

Re-verify anything older than six months before it enters a client
document.

---

## 1. How retrieval works

| Claim | Grade | Source | Date |
|---|---|---|---|
| The user prompt is rewritten into one or more targeted queries before retrieval | **[D]** | OpenAI help center, ChatGPT Search | 2026-07 |
| Engines re-query after reviewing first-round results | **[D]** | Same, with worked example | 2026-07 |
| Memory is injected into the rewritten query | **[D]** | Same | 2026-07 |
| IP location is injected into the query text, not applied as a filter | **[D]** | Same | 2026-07 |
| Google uses "query fan-out" across subtopics in AI Overviews and AI Mode | **[D]** | Google Search Central | 2025-12 |
| Deep Search "can issue hundreds of searches" | **[D]** | Google blog | 2025-05 |
| Bing expands a short query into a "comprehensive description" and ranks against that | **[D]** | Microsoft, Deep Search | 2023-12 (stale, only architecture disclosure) |
| Consulted sources exceed cited sources; retrievable via `web_search_call.action.sources` | **[D]** | OpenAI API docs | live |
| Rewritten queries exposed via `action.queries`; `action.query` deprecated | **[D]** | openai-openapi spec | live |
| OpenAI runs its own index and cache, in addition to Bing | **[D]** | OpenAI "Offline web search" help article | 2026-06 |
| ChatGPT still uses Bing and Shopify as third-party providers | **[D]** | OpenAI help center | 2026-08 |
| **Grounding is transient**: page text purged after response; later turns see the model's summary | **[R]** | DEJAN, API introspection | 2026-03 |
| Claude carries retrieved results forward across turns via `encrypted_content` | **[D]** | Anthropic docs | live |

**Implication that matters most:** you are not competing for the string the
user typed. You are competing for a machine-authored expansion of it.

---

## 2. Passage and page mechanics

| Claim | Grade | Detail | Date |
|---|---|---|---|
| Retrieval unit is 150 to 400 words | **[D][R]** | Cohere auto-chunks >510 tokens; Vertex caps 500; Microsoft recommends 512; Chroma found 200 optimal | 2024-2026 |
| A page ranks at the rank of its best passage | **[D]** | Cohere rerank internal chunking | live |
| Rerankers score **completeness of answer** | **[D]** | Azure published 0-4 rubric, "adapted from Microsoft Bing". 4.0 = "answers the question completely," tolerates extra unrelated text | 2026-08 |
| Adding missing context to a chunk cuts retrieval failure 35% | **[R]** | Anthropic contextual retrieval, measured | 2024-09 |
| Article pages extract at F1 0.93; other page types 0.41 to 0.84 | **[R]** | WCXB, 2,008 pages, 13 extraction systems | 2026-05 |
| Most AI crawlers do not execute JavaScript | **[V+][D]** | Vercel crawler study; Anthropic states it for `web_fetch` | 2024-12, live |
| 69% of 23 major AI crawlers cannot execute JS | **[V+]** | iPullRank audit | 2026 |
| Statistics in text correlate with citation | **[P][R]** | Princeton GEO +33%; arXiv 2604.25707 +61.55% absorption | 2023-11, 2026-04 |
| Definitions and comparisons carry ~3x the influence of reference-only citation | **[R]** | arXiv 2604.25707, 21,143 citations | 2026-04 |
| Keyword stuffing correlates negatively | **[P]** | Princeton GEO | 2023-11 |
| Formatting-only edits show minimal effect | **[R]** | arXiv 2605.25517, 252,000 trials | 2026-05 |
| Grounding runs on a ~2,000-word budget split by rank | **[V+]** | DEJAN, 7,060 queries / 2,275 pages | 2026 |

### Contested

| Question | Position A | Position B |
|---|---|---|
| **Page length** | Influence rises monotonically past 3,000 words, no decline **[R]** arXiv 2604.25707 | Correlation 0.04; 53% of AIO citations under 1,000 words **[V+]** Ahrefs |
| **FAQ format** | Q&A format is the only genre with a measured negative effect, −5.74% **[R]**; removing FAQ schema improved share +7% **[V]** | Widely repeated as the highest-ROI AEO asset **[X]** |

**Resolution for both: write to the natural length of the material,
structure it heavily, express questions as headed sections rather than
accordion markup.** Do not state either position as settled.

---

## 3. Multi-turn

| Claim | Grade | Detail |
|---|---|---|
| Turn 2+ retrieval matches a machine-authored standalone query, not the user's words | **[D]** | LlamaIndex `CondenseQuestionChatEngine`, LangChain `create_history_aware_retriever`, Azure agentic retrieval, NLWeb decontextualization |
| Recall@5 drops 0.89 (turn 1) → 0.47 (turns >1) | **[P]** | MTRAG, IBM, 110 conversations / 842 turns |
| 85.7% of hard multi-turn failures are recall failures, not ranking | **[R]** | SemEval-2026 Task 8 system paper |
| Best-in-world multi-turn retrieval tops out at nDCG@5 ≈ 0.58 | **[R]** | SemEval-2026 Task 8, 38 teams |
| Query diversity beats retriever diversity | **[R]** | AILS-NTUA, +25.7% from five parallel rewrite strategies |
| History context saturates after 4 to 6 user turns | **[R]** | Same |
| ~50% of real conversations contain a constraint stated earlier that never reappears in the final prompt | **[R]** | arXiv 2607.22392, 670 commercial + 7,463 PRISM conversations |
| Only 30% of brands stay visible across consecutive answers | **[V]** | RankScience |
| Multi-turn brand measurement: named in print, instrumented by no vendor | **[V+]** | Search Engine Land 2026-07-06; verified absent from Profound, Peec, Evertune, Scrunch, Ahrefs, Semrush |

**Do not claim turn-path measurement is a novel idea.** It was published
2026-07-06. Claim the instrument, not the insight.

---

## 4. Source selection and distribution

| Claim | Grade | Number |
|---|---|---|
| Cross-engine source overlap | **[P]** | Jaccard < 0.2 (SIGIR 2026, 11,500 queries) |
| ChatGPT search vs Google organic top-100 domain overlap | **[R]** | 25% |
| Google AIO citations from its own top 10 | **[R]** | 41.4% (WashU, 55,393 queries) |
| Google AIO citations off-page entirely | **[R]** | 29.8%, and higher credibility than on-page |
| AIO activation rate overall | **[R]** | 13.7%; 64.7% question-form; **9.5% non-question** |
| AIO activation, 2-word queries | **[R]** | **3.4%** |
| ChatGPT search cites forums | **[R]** | **0.1%** (vs Google AIO 8.5%) |
| UGC share, AIO vs organic | **[R]** | 14.2% vs 41.4% |
| Citations per answer | **[R]** | ChatGPT ~6.9, Google AIO ~8 to 12, Perplexity ~16 |
| ChatGPT absorbs each source ~4.2x more deeply than Perplexity | **[R]** | Influence 0.2713 vs 0.0646 |
| 85.5% of AI citations trace to earned media | **[V+]** | Muck Rack, 1M+ prompts |
| 75 of 90 primary-research citations came from head-to-head benchmark tables | **[V+]** | Arcalea |
| Only 28% of brands get both a citation and a recommendation | **[V]** | RankScience |

**Reddit strategy is a Google and Perplexity play, not a ChatGPT play.**

---

## 5. Brand and entity signals

| Claim | Grade | Number |
|---|---|---|
| Domain popularity (Tranco) is the top predictor of LLM-unique citation | **[R]** | SHAP 0.923; outlinks 0.799 (HKUST, 124,287 domains) |
| LLM popularity judgments track raw pretraining exposure more than Wikipedia pageviews | **[P]** | SIGIR 2026, 2,000 entities vs 7.4T tokens |
| YouTube mentions correlate with AI visibility ~3x stronger than Domain Rating | **[V+]** | Ahrefs, 75,000 brands, Spearman 0.737 vs 0.266 |
| Identical specs → known brand recommended 100% of the time | **[R]** | Chu & Hou, semi-simulated |
| That lock breaks at +0.075 stars, 1.6× reviews, or 7.3% discount | **[R]** | Same |
| Authority framing breakthrough rate | **[R]** | 73.3% |
| Social proof lift | **[P]** | +9.75% to +42.12% (EMNLP 2025) |
| **Scarcity and exclusivity backfire** | **[P][R]** | −5% to −46% |
| English Wikipedia presence cuts citation-fabrication odds 63% | **[V+]** | Data published on Zenodo |

**The review threshold is the cheapest documented lever.** A fraction of a
star or 1.6× review count flips a recommendation.

**Audit client copy for exclusivity framing.** Premium positioning that
reads as exclusivity may work against AI recommendation even where it works
for humans.

---

## 6. Local and service businesses

| Claim | Grade | Number |
|---|---|---|
| ChatGPT referral for local | **[V+]** | 0.1% → 2% of Google's traffic YoY, 179 GBP profiles (Sterling Sky) |
| Locations recommended by ChatGPT vs Local 3-Pack | **[V]** | 1.2% vs 35.9% (SOCi, 350,000 locations) |
| Local Pack businesses invisible in AI Mode | **[V+]** | 28.5% (1,120 searches, 7 verticals) |
| Local query AIO trigger rate | **[V+]** | Contested: 7.9% (Ahrefs, 146M SERPs) vs 68% (Whitespark). Definitional gap |
| Where local AI answers source from | **[V]** | Yelp ~27%, Google ~21%, Reddit ~14%, Facebook 9%, Angi 6.5% |
| Foursquare powers ChatGPT local results | **[V]** | 60-70% (BrightLocal) |
| Top AI-visibility factors for local | **[V+]** | Expert-curated "best of" lists, dedicated service pages, prominence on industry domains (Whitespark, 47 experts) |
| Consumers requiring 4.5+ stars | **[V]** | 31%, up from 17% YoY |
| Consumers wanting reviews from last 2 weeks | **[V]** | 32%, up from 20% |
| After an AI recommendation, users re-verify | **[V]** | 62% re-search Google, only 7% act without verification |

**The honest client line:** AI is a shortlist layer for local, not a
closing layer. And "mentions are the new link": citation work shifted from
proving NAP consistency to getting named on third-party pages a model might
retrieve.

**Google has not confirmed that Google Business Profile feeds
searcher-facing AI Overviews.** The only dated Google statement covers a
business-owner Gemini feature. Say "observable behavior suggests."

---

## 7. Effect sizes, and the honest ceiling

| Claim | Grade | Number |
|---|---|---|
| Controlled natural experiment on AEO deployment | **[R]** | Treatment effect **1.82x** (95% CI 1.31-2.54), **p = 0.16**, against a 3.5x untreated-control tailwind |
| Survey of 45 GEO studies, Nov 2023 to Jul 2026 | **[R]** | "**No reviewed technique shows a stable, longitudinal, cross-platform causal effect on organic discoverability.**" Also: "citation-oriented rewrites can impair retrieval" |
| 43% of topically relevant pages earn zero citations regardless of quality | **[R]** | AgentGEO. Three failure modes execute before quality is evaluated |
| Structural optimization | **[R]** | +17.3% citation rate across six engines |

**Carry the 1.82x / p=0.16 number into every client conversation.** It is
the most honest effect size available and it protects against overpromising.
Most published AEO multiples are platform growth, not treatment effect.
