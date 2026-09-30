# Inclusive and non-visual writing

Sourced from Adobe Spectrum's *Inclusive UX writing*, *Writing about people*, *Writing with visuals*, and *Writing for readability*, which are the most complete public treatment of this available. Load for any string that describes a person, any alt text, any icon-only control, and any AUDIT of a product shipping to more than one kind of household.

**The framing that makes the rest follow:** think and write as if the visuals do not exist. A string that works with no layout, no colour, and no icon works for everyone.

---

## Readability target

**6th-grade Flesch-Kincaid.** Short sentences. Few adverbs and adjectives. Simple tenses. Active voice by default.

This is not dumbing down. It includes people reading in a second language, people with cognitive and neurological differences, people of every age, and everyone who is tired, which on a dinner product at 5:30pm is the entire audience.

```
Avoid    This file has been exported successfully to be opened in one of our
         other awesome products, Adobe Illustrator.              (18 words, grade 13.1)
Prefer   We exported the file. Now you can open it in Illustrator.
                                                                  (4 + 7 words, grade 4.8)
```

Four things died: past perfect → simple past, passive → active, `successfully` (adverb), `awesome` (adjective).

**Estimating read time.** Screen readers deliver about 25 syllables per second. A person reading at a 6th-grade level manages about 3 words per second. Use these when a string sits behind a timeout. A toast that outlives its own text is a bug.

### Everyday word swaps

| Prefer | Avoid |
|---|---|
| Buy | Purchase |
| Help | Assist |
| About | Approximately |
| Like | Such as |
| Turn on / turn off | Enable / disable |
| Open | Launch |
| Latest version / older version | Current version / previous version |

---

## Who the product is talking about

| Prefer | Avoid | Why |
|---|---|---|
| **People** | Customers | Not everyone is paying. Use `customers` only when the sentence genuinely depends on the payment |
| **You** | Users | Speak to the person, not about them. `User` is fine when the sentence is about a role (an admin managing permissions) |
| Helps **you** create in 3D | Is for graphic designers looking for an edge | Do not narrow who the product is for |
| **View**, **Show**, **Go to all** | See all | Not everyone is seeing |
| **Play** video | Watch video | Not everyone is watching |
| Last updated: 2 days ago | Updated • 2d ago | Symbols and abbreviations garble in a screen reader |
| Update your information (step 1 of 3) | Confirm your information | Say where they are and how far is left |

---

## Writing about people

Only include a personal quality when it is relevant. Write the sentence, then read it back and ask who it centres and who it leaves out.

**Watch for proxy statements**: sentences that quietly assume something about money, ability, or background. `Just buy more storage` assumes disposable income. `View storage options` does not.

### Disability

Person-first (`person with a disability`) and identity-first (`deaf person`) are both correct, and no community picks one unanimously. When writing about a specific person, ask them. When writing generally, follow the community's own dominant usage.

| Prefer | Avoid |
|---|---|
| Disabled person, person with disabilities | Differently abled, the disabled |
| Blind person, person who is blind | The blind |
| Amir uses a wheelchair | Amir is confined to a wheelchair |
| Keyanna has autism | Keyanna suffers from autism |

**Never** `suffering from` or `victim of`.

**Terms borrowed from disability as metaphor** are the ones that slip into product copy unnoticed. The common offenders: `sanity check` (say coherence check), `grayed out` (unavailable, turned off), `crazy` (ridiculous, unpredictable), `dummy variable` (placeholder), `tone-deaf` (inconsiderate), `OCD` (organised).

Adobe Spectrum's [Writing about people](https://spectrum.adobe.com/page/writing-about-people/) carries the full list and keeps it current. Use it as the reference rather than copying it into a house doc that will go stale.

### Race and class

The software terms with the clearest replacements: `whitelist`/`blacklist` become allowlist/blocklist. `master`/`slave` becomes primary/secondary. `master` as a descriptor becomes primary, main, or source. `grandfathered` becomes legacy. `nude`/`flesh` as a colour becomes the actual colour.

`dark mode`, `light theme`, `black screen` are fine: they describe brightness, not value.

Borrowed terms worth dropping: `guru` and `ninja` (expert), `sherpa` (guide), `spirit animal` (role model), `pow wow` (meeting), `long time no see` and `no can do`. Both originated as mockery of the people who would now be reading them.

**Name examples carry more than anyone expects.** A product whose sample data is all John, Bill, and Amy has told everyone else it was not built for them. Vary them.

Full lists and reasoning: [Writing about people](https://spectrum.adobe.com/page/writing-about-people/), the [Conscious Style Guide](https://consciousstyleguide.com/), and the [National Center on Disability and Journalism](https://ncdj.org/style-guide/).

### Gender

- **Singular they** when pronouns are unknown. Never `he/she` or `(s)he`.
- Gender and sexuality words are **modifiers, not nouns**: `a transgender woman`, not `a transgender`. `Jing, a non-binary person`, not `Jing is a non-binary`.
- `What are your pronouns?`, not `preferred pronouns`.
- Avoid gendered role words: server not waitress, flight attendant not stewardess, businessperson not businessman, a group of people not guys.

**Before asking anyone's gender, ask whether the product needs it.** If it genuinely does: common options, a self-describe field, multiple selection, and an opt-out. `Prefer to self-describe` and `Prefer not to say`, never `Other`.

---

## Directional language

**Organise by time, not by position.** Spatial words break for anyone using a screen reader, a magnifier at high zoom, a mirrored right-to-left layout, or a screen size the writer never saw.

| Prefer | Avoid |
|---|---|
| First | Above |
| Next | Below |
| Finally | At the bottom |
| In the menu bar | On the left |

Same reason a string may not depend on colour or an icon alone. If a red outline is the only thing marking a field as wrong, the field is not marked as wrong.

---

## Write the effect, not the appearance or the gesture

Say what a control **does**. Never what it looks like, and never how to physically touch it. Control type is coded separately, so assistive tech already announces "button" or "slider", and each person's setup describes the gesture that applies to them.

| Prefer | Avoid |
|---|---|
| Save | The "Save" button |
| Edit | The pencil icon |
| Enter email | Type email address |
| Select, go to | Click, tap |
| Zoom in | Pinch the trackpad |
| Menu | Side drawer |
| On / off | Toggle, switch, activate |
| The Go button | The green button |
| Secure site | 🔒 |

This is also why emoji and icons cannot carry meaning alone: they read differently across cultures, and they localise badly.

**Avoid naming things.** Every new name is a new concept somebody has to learn. When a name is unavoidable, define it before you use it, and use the same name everywhere.

---

## Alt text

### Does this image need it

**Yes** if the image carries information nothing else on screen carries, or if it contains words that would need translating.
**No** if it is decorative, or if the surrounding text already says what it shows. Redundant alt text is noise.

### Writing it

- **Be additive.** Supply what would be lost, not what the caption already said.
- **Active voice.** Simpler and more human out loud.
- **Same tone and terminology as the product.** Alt text is product copy. No jargon that has not been introduced.
- **Never open with "image of."** A screen reader already announced it. Do say `chart of`, `diagram of`, `data visualisation of` when that is what it is.
- **Capital letter, full stop**, even for a fragment. It gives the screen reader natural inflection.
- **No abbreviated dates, times, or units.** They get spelled out letter by letter.
- **Write it for translation.** Succinct and straightforward.

```
Weak    Basketball player making a basket at an arena.
Better  Chicago Bulls player Michael Jordan making his first of 38 points
        against the Utah Jazz, despite speculation that he had the flu.
```

**For an image that is UI:** name every part and its content, in the order a screen reader would reach them.
**For an image acting as a control:** describe the action, never the picture. `Send message`, not `paper airplane in motion`.

---

## Forms

- **Never `Clear` or `Reset`** on a form. One mis-tap destroys real work.
- **Let people save and come back.** Especially anything long.
- Label and instruct enough that the error never fires.
- Errors described in text, not by colour or icon alone.
- Keywords **before or inside** the link, never after.

## Layout facts that change the writing

- Left-align running text. Justified text creates rivers of white space that are hard to read with dyslexia.
- 50–75 characters per line, maximum.
- Sentence case. **All caps only for acronyms.** See the divergence note in `directness.md` for where the house deliberately differs.
- Camel case in hashtags so screen readers can parse them: `#CamelCase`.
- Spell out an uncommon acronym on first use, shortened form in parentheses after.
- Avoid homonyms, or make the sense obvious from context.

## Idioms

Cut them. They translate badly, and several common ones started as mockery of the people who would now be reading them. `Long time no see` and `no can do` both have that history. `Wax on, wax off` means nothing outside one film in one country.

Plain language is not blander. It just reaches everybody.
