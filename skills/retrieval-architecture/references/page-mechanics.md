# Page Mechanics

**Last verified 2026-08-07.** How retrieval physically consumes a page, and
what to do about it.

---

## 1. Your page is not the unit. Your best passage is.

Every vendor that publishes a number converges on **200 to 512 tokens**.

| System | Chunk size |
|---|---|
| Cohere Rerank | **auto-chunks anything >510 tokens** |
| Vertex AI Search | 500 hard cap (range 100-500) |
| Microsoft recommended | 512, 25% overlap |
| Chroma evaluation | 200 optimal |
| Google Ranking API | 512, or 1,024 on the newest model |

**Consequence: a 3,000-word page is silently cut into ~510-token windows,
and the best-scoring window represents you.** Everything else is dead
weight for that query.

**Write in 150 to 400 word sections under descriptive headings.** That is
not an SEO heuristic. It is the shape the infrastructure operates on.

---

## 2. The published reranker objective

Azure's semantic ranker, which Microsoft states is "adapted from Microsoft
Bing," publishes its 0-4 rubric:

| Score | Meaning, verbatim |
|---|---|
| **4.0** | "highly relevant and answers the question completely, **though the passage might contain extra text unrelated to the question**" |
| 3.0 | "relevant but lacks details that would make it complete" |
| 2.0 | "answers the question either partially or only addresses some aspects" |
| 1.0 | "answers a small part of it" |
| 0.0 | "irrelevant" |

**A production reranker publishing its objective function, and the
objective is completeness.** Not keyword density. Not authority. Surrounding
irrelevant text is explicitly tolerated.

**So: every section answers its own heading completely.** A section that
half-answers scores 2.0 no matter how good the page around it is.

Related truncation limits worth knowing: Azure allocates title 128 tokens,
keywords 128 tokens, content the remainder, and "ignores anything after the
maximum limit." Front-load.

---

## 3. Sections must survive being quoted alone

Anthropic measured this directly. Prepending 50 to 100 tokens of
situating context to each chunk before embedding cut retrieval failure:

| Configuration | Failure rate at top-20 |
|---|---:|
| Embeddings alone | 5.7% |
| + contextual embeddings | 3.7% (−35%) |
| + contextual BM25 | 2.9% (−49%) |
| + reranking | 1.9% (−67%) |

**The measured problem is that a chunk lifted out of a document loses its
subject.** Anthropic solved it by generating the missing context. A page
can solve it by writing it.

**Rule: no pronoun in a section refers outside that section.** Name the
jurisdiction, the product, the entity, in every section. Google's
`includeAncestorHeadings` is the same fix from the index side.

---

## 4. Grounding is transient, so write for compression

Google's AI search loads retrieved snippets into context, answers, then
**purges them** to free tokens. On follow-up turns the model has the
conversation history and **its own prior summary of your page**.

Corroborating from a different source: only 30% of brands stay visible
across consecutive answers.

**Turn one is a retrieval contest. Turns two onward are a
compression-fidelity contest.**

**Rule: the first extractable passage carries the differentiator, with the
number in it.** Everything downstream is a lossy copy of that passage.

Good: "DeKalb pool permits run 10 to 15 business days on first review, and
62% clear on the first pass."

Bad: "Permitting in DeKalb County involves coordination across several
departments."

The first survives compression into turn three. The second does not.

---

## 5. Non-article layouts lose content before retrieval

Extraction benchmark across 2,008 pages and 13 extraction systems:

| Page type | Extraction F1 |
|---|---:|
| Articles | **0.93** |
| Forums, products, collections, listings, docs, service pages | **0.41 to 0.84** |

**A 16 to 52 point penalty before retrieval even begins.** If pricing,
specs, or comparisons exist only inside cards, tabs, accordions, or table
markup, a large fraction may never reach the index as clean text.

**Rule: provide a prose rendering of every fact that also appears in a
component.** The card can stay. The sentence has to exist too.

The extraction pipeline itself is Readability-class: fetch HTML → strip
nav, footer, sidebars → convert to text. What survives is what a reader
mode would show.

---

## 6. JavaScript is a hard wall

**No major AI crawler except Google's and Apple's executes JavaScript.**
GPTBot and ClaudeBot fetch JS files and never run them. Anthropic states it
outright for its fetch tool. One audit found 69% of 23 major AI crawlers
cannot execute JS at all.

Also worth knowing: AI crawler 404 rates run around **34%** versus
Googlebot's 8%, which means URL stability and sitemap hygiene matter more
here than in classic SEO, not less.

**Verify, do not assume.** `curl` the URL, strip tags, count words. Static
site builders often render fine. Client-hydrated apps often do not.

---

## 7. Crawler taxonomy: three functions, not one

| Function | OpenAI | Perplexity | Anthropic | Google |
|---|---|---|---|---|
| **Search inclusion** | **OAI-SearchBot** | **PerplexityBot** | Claude-SearchBot | Googlebot |
| Live user fetch | ChatGPT-User | Perplexity-User | Claude-User | none |
| Training | GPTBot | separate | ClaudeBot | Google-Extended |

**The distinction that costs citations:**

- Blocking **GPTBot** blocks training only. **It does not affect ChatGPT
  search visibility.**
- Blocking **OAI-SearchBot** removes you from ChatGPT search answers.
- The **user-triggered fetchers ignore robots.txt** by vendor policy.
- **Google-Extended is a robots token, not a crawler.** You cannot log a
  hit. It does not affect Search inclusion.
- robots.txt changes take **~24 hours** to propagate to ChatGPT search.

**A named user-agent block replaces the wildcard entirely.** If you add
`User-agent: GPTBot / Allow: /` with no disallows, GPTBot gets access to
everything the wildcard rule was protecting. Repeat the disallow list under
every named agent.

**The only ranking statement OpenAI has published**, verbatim: "to be
included it is important to allow OAI-Searchbot to crawl your site, and
ensure your site host and/or content delivery network allows traffic from
our published IP addresses." Two checkable requirements. Check both.

Note: OpenAI's published crawler IP ranges are **IPv4 only**. An IPv6-only
origin is unreachable.

---

## 8. Content elements that correlate with citation

From the largest content-feature study (21,143 citations across three
engines), relative influence when present versus absent:

| Element | Lift |
|---|---:|
| Code | +76.9% |
| **Numbers and statistics** | **+61.6%** |
| Definitions | +57.3% |
| Comparisons | +55.3% |
| How-to steps | +41.2% |
| Q&A / FAQ format | **−5.7%** |

And by the semantic role the passage is cited in:

| Role | Mean influence |
|---|---:|
| Definition | 0.153 |
| Comparison | 0.152 |
| Evidence | 0.124 |
| Background | 0.080 |
| Reference-only | 0.053 |

**Being cited as a definition is ~3x more valuable than being cited as a
bare reference.** Write the canonical definition of the thing you sell.

Structural correlates, top versus bottom influence quartile: heading count
12.5×, word count 11.4×, list density 8.9×.

**Caution:** these are correlations across fetched pages, not controlled
interventions. A 252,000-trial controlled study found formatting-only edits
had minimal effect. The distinction is between changing how content is
**organized into retrievable units** and changing how it **looks**.

---

## 9. Write for the expansion, not the query

The user's words are never the retrieval key. Bing expands a short query
into a "comprehensive description" and ranks against that. Google fans out
into subtopics. OpenAI rewrites into one or more targeted queries and
re-queries after seeing results.

**A page written for one narrow phrasing competes in a space that does not
exist.** A page comprehensively covering a subtopic wins the sub-query it
was fanned out into, which is why 30 to 60% of AI Overview citations come
from outside the top 10 for the parent query.

For multi-turn specifically: turn 2+ matches **machine-authored** text,
which is more formal, more complete, and uses canonical domain
terminology. Match that register, not casual phrasing.
