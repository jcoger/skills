# Lexicon: controlled vocabulary

One concept, one word, everywhere. Little inconsistencies creep in constantly: here it is the "welcome" screen, there the "sign-in" screen. Here it is a "free trial," there a "test drive." This button says `Submit`, that one says `Send`. Each one is small. Together they make a product feel like it was built by strangers.

A controlled vocabulary is a custom dictionary for the product. It is the cheapest consistency mechanism that exists, and it makes editing for consistency a find-and-replace job instead of a judgment call.

---

## Building one

**1. Inventory what exists.** Grep the repo for every user-facing string. In a Next.js repo that is JSX text nodes, `aria-label`, `placeholder`, `title`, plus any Sanity fields that render as UI. In an Expo repo, add `accessibilityLabel` and anything in the theme's string files.

**2. Group by concept, not by string.** All the words currently used for the same idea go in one row. This is where the inconsistencies surface.

**3. Pick one.** Preference order:
- What users actually say. From research interviews, support tickets, reviews. Pull out the nouns and verbs people use. The goal is not to mimic them (the interface is not a peer). It is to be *intelligible* to them.
- The most common word in the world, not in the industry.
- The shortest of the acceptable options.

**4. Record what it replaces.** The rejected words go on the proofing search list.

## The table

Three statuses, not two. **"Use with caution" is the category that does the real work**: most contested words are not banned, they are correct in one context and wrong in another, and a binary table forces a false choice. *(Structure from Adobe Spectrum's in-product word list.)*

```
| Word | Status | Usage notes |
|---|---|---|
| Tutor | Preferred | The person teaching. Never instructor, provider, vendor, partner |
| Book | Preferred | Verb, for reserving a tutor. "Book Priya" |
| Plan | Use with caution | A saved set of lessons. Not the pricing plan. Say Plan only where a lesson set is meant |
| Add | Use with caution | Bringing an existing thing into a view. Never for inviting a person |
| Session | Open | Unsettled. See the open decisions table |
| Enable / disable | Avoid | Needlessly technical. Turn on / turn off |
```

Usage notes carry the *why* and an example. A row without a note gets re-litigated.

Store it where the team will actually see it: a `LEXICON.md` at repo root, or a layer in the pattern library, or a Sanity singleton if the strings are CMS-driven.

## Open terminology decisions

Some terms are not settled, and pretending otherwise means every agent re-decides them silently and differently. Keep a second, shorter table of the live ones with their candidates.

```
| # | The question | Candidates |
|---|---|---|
| 1 | What do we call the time with a tutor? | Session · Lesson · Booking · Class |
| 2 | What do we call the people we serve? | Family · Member · Student · Customer |
```

**Rules for the open list.**
- An open term is a decision awaiting a person, not a gap to fill with judgment. Pick the most common candidate to keep working, mark the row as provisional, and do not quietly promote it to the settled table.
- Every open term names what it costs to change later. A word in a nav label is cheap; a word in a URL, a push notification, or an App Store listing is not.
- When one is settled, move it to the settled table with the date and who decided. Do not leave it in both.

---

## Verbs

Verbs are the point of the interaction. They define the range of what a person can do inside the product, which makes them the highest-leverage words in it.

| Verb | Means | Not |
|---|---|---|
| Delete | Gone from the system, unrecoverable | Remove, Archive |
| Remove | Gone from this list, exists elsewhere | Delete |
| Archive | Hidden, recoverable, still counted | Delete, Remove |
| Clear | Emptied of contents, container stays | Delete |
| Save | Persisted, will be here next time | Submit, Apply |
| Apply | Takes effect now, in this session | Save |
| Send | Leaves and reaches another person | Submit, Share |
| Share | Grants another person access | Send |
| Publish | Becomes visible to an audience | Save, Send |
| Cancel | Abandons the current dialog or flow | Close, Back |
| Close | Dismisses without abandoning | Cancel |
| Sign in / Sign out | Session | Log in, Login (noun), Register |
| Create account | New identity | Sign up, Register, Join |

Pick one side of each pair and never mix. If the product says `Sign in`, it never says `Log in` anywhere, including in an error message.

---

## Banned outright

**House defaults for every user-facing string (a product's own voice doc overrides them):**

- **Em dashes.** Zero. Periods, commas, line breaks. Attribution lines (`— Sarah, Brookhaven`) and en-dash ranges are the only survivors.
- curated · bespoke · seamless · elevate · AI-powered

**UI-specific bans:**

| Banned | Why | Instead |
|---|---|---|
| `Submit` | Describes what the form does, not what the user gets | The specific action: `Send message`, `Save changes`, `Place order` |
| `Click here` | Breaks across modes; useless to a screen reader | Link the phrase that describes the destination |
| `Oops!` | Adults reserve this for inconsequential mishaps | Own the error in adult words |
| `My [anything]` | Reads as labels stuck on objects. Sounds absurd spoken aloud | `Your account`, or no possessive at all |
| `Get Started` alone | A login wall in a friendly coat | Say what starts, and what it costs |
| `Learn more` | Says nothing about the destination | Name what they will learn |
| `Please wait` | Adds nothing to a spinner | What is happening, or nothing |
| Self-describing as *helpful*, *quick*, *innovative*, *smart*, *important*, *compelling*, *world-class* | If you have to say it, you are not it | Show it, or cut it |
| `Are you sure?` alone | Sure about what? | State the consequence |
| `Something went wrong` alone | True and useless | What went wrong, and what to do |

**Add to this list per project.** The exercise of naming what you must never sound like is faster than defining what you should sound like. Make the interface as bureaucratic or as robotic as you can, on purpose, for five minutes. Then write the real thing.

---

## Proofing search list

Before delivering any sheet, run these searches over your own output. This is not a list of dos and don'ts. It is a way to see the text freshly enough to catch what your brain smoothed over.

```
—                    em dash, must be zero
Submit               banned as a label
Click here           banned
Oops                 banned
My                   possessive check
Please wait          banned
Learn more           vague
Something went wrong bare, no cause
Are you sure         bare, no consequence
Get Started          unexplained
curated|bespoke|seamless|elevate|AI-powered
world-class|innovative|compelling
Log in|Login         if the product says Sign in
Sign up|Register     if the product says Create account
!                    exclamation count: should be near zero
...                  ellipsis in labels: usually means the label is unfinished
```

Add project-specific entries: misspellings of product and feature names, terms the lexicon rejected, words you personally overuse.

---

## Personality, when it is needed

Only reach for this when the product's voice is genuinely unsettled and strings are coming out generic.

**Do not** run the "what car would our app be" exercise. Ask instead: **what human role does this product play in the user's life?** Real estate agent. Maître d'. Bike shop mechanic. Reliable banker. Compassionate funeral director. Then write as that person would speak, adjusted for the fact this is an interface and not a peer.

Being conversational says nothing about how serious the conversation is. Doctors have conversations. Bankers have conversations. The register changes; the conversational structure does not.

Four dimensions worth stating explicitly:

| | The question |
|---|---|
| **Identity** | Is the product speaking as the company, the service, or a named agent? |
| **Expertise** | What should the user expect it to know, about what? |
| **Mood** | Neutral, warm, dry, brisk? Most interfaces are neutral to slightly positive |
| **Relationship** | Advisor, teacher, assistant, or tool? |

Then two lists: three adjectives you want users to reach for, and three you most fear. The second list does more work than the first.

**Localization warning.** Personality does not translate. Translating for meaning loses the emotional register. If the product ships in more than one language, keep the personality in the structure (brevity, ordering, directness) and out of idiom.

---

## Non-verbal cues are part of the string

An emoji, a haptic, a sound, or an animation carries meaning the same way a word does, and gets checked against the same maxims. A sad-face emoji from your bank about an overdraft fails Politeness. A congratulatory notification for reading five pages of a technical PDF fails Relation. Decide these deliberately or they get decided for you.
