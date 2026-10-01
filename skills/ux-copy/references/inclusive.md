# Inclusive and non-visual writing

Sourced from Adobe Spectrum's *Inclusive UX writing*, *Writing about people*, *Writing with visuals*, and *Writing for readability*, which are the most complete public treatment of this available, plus Horton & Quesenbery, *A Web for Everyone* (Rosenfeld, 2014), cited by chapter and page and corrected where it has dated. Load for any string that describes a person, any alt text, any icon-only control, any caption or transcript, and any AUDIT of a product shipping to more than one kind of household.

**The framing that makes the rest follow:** think and write as if the visuals do not exist. A string that works with no layout, no colour, and no icon works for everyone.

**The frame under that one:** disability is where a person's ability meets a barrier the product built (Horton & Quesenbery, ch. 1, p. 3). A string that cannot be understood is a barrier the product built. It is a defect, not a user limitation.

**This file owns the words.** Focus, target size, contrast, motion, zoom, platform settings, and the law and its dates live in a UI design or layout skill's accessibility reference. Form mechanics (labels, grouping, errors, autocomplete, authentication) live in that skill's forms reference. This file points there rather than restating them.

---

## The WCAG criteria that are literally about wording

Conformance, not preference. These are the ones a string can fail on its own.

**Which WCAG.** Build to **WCAG 2.2 AA** (W3C Recommendation, Oct 2023; ISO/IEC 40500:2025). Most laws still cite 2.1 AA, which 2.2 contains. WCAG 3.0 is a Working Draft with no Recommendation date; do not write to it. Detail and dates belong to a UI design or layout skill's accessibility reference.

| Criterion | Level | What it requires of a string |
|---|---|---|
| **2.5.3 Label in Name** | A | The accessible name **must contain the visible label text**. `Search` on the button cannot carry `aria-label="Submit form"`: voice-control users speak what they see, so a mismatch makes the control unreachable. Capitalisation and punctuation differences are fine; **word order differences are a documented failure** |
| **3.2.4 Consistent Identification** | AA | **Same function, same name, everywhere.** `Search` on one screen and `Find` on another is a named failure. Extends to alt text on icons |
| **3.3.1 Error Identification** | A | The error must be **described in text**. Colour or an icon alone fails |
| **3.3.3 Error Suggestion** | AA | If the fix is known, supply it. W3C's own strings: `Choose one of: January, February…` and `Do you mean 'December'?` |
| **3.3.2 Labels or Instructions** | A | Labels must exist and must state the format when it is unusual, balanced against *"not to clutter the page with unnecessary information"* |
| **3.3.4 Error Prevention** | AA | Legal, financial, or data-changing actions must be **Reversible, Checked, or Confirmed.** This is the conformance basis for a review-and-confirm screen |
| **2.4.6 Headings and Labels** | AA | Descriptive, but *"a word, or even a single character, may suffice."* They need not be long or unique |
| **4.1.2 Name, Role, Value** | A | The name must be programmatically determinable. It may be hidden and exposed only to assistive tech |
| **2.4.4 / 2.4.9 Link Purpose** | A / AAA | `click here` and `read more` **fail A** without adjacent context, and **fail AAA regardless**. Context counts only from the same sentence, paragraph, list item, or table cell |
| **2.4.2 Page Titled** | A | Every page and screen has a title that says what it is. Order it **page, section, product**: `Invoices · Billing · Acme`. It is the first thing a screen reader announces and the text in a tab, a bookmark, and a search result (Horton & Quesenbery, ch. 6, p. 93) |
| **3.1.1 / 3.1.2 Language of Page / Parts** | A / AA | The page declares its language, and a passage in another language is marked. Without it a screen reader pronounces Spanish with English rules, and browser translation guesses |
| **4.1.3 Status Messages** | AA | A toast, a "Saved", a result count is announced without moving focus. So it must **make sense heard alone**, with nothing on screen: `3 invoices sent`, not `Done!` |
| **3.1.3 / 3.1.4 Unusual Words, Abbreviations** | AAA | A coined term, jargon, or abbreviation has a definition reachable in place. Treat this as required practice, not optional: COGA below says the same |

**3.2.4 is the one most people miss, and it turns the lexicon into a conformance requirement.** A controlled vocabulary is not a style preference. Inconsistent naming for identical functions is a Level AA failure. *(Consistent does not mean identical: `Go to page 4` and `Go to page 5` are consistent.)*

**WCAG 2.2's nine new criteria are mostly not about wording** (focus, target size, dragging, help placement, authentication), but three reach the string sheet:

- **3.2.6 Consistent Help** (A). Wherever help appears (`Contact us`, `Chat with support`, a help link), it sits in the **same relative order** on every page and keeps the **same name**. That makes the help link's label a lexicon entry, not a per-screen choice.
- **3.3.7 Redundant Entry** (A). Never write `Re-enter your address` when the flow already has it. Offer `Same as billing address` instead.
- **3.3.8 Accessible Authentication** (AA). No instruction may ask a person to transcribe, recall, or solve something to log in: no `Type the characters you see`, no `Enter the code without pasting`. Mechanics belong to a UI design or layout skill's forms reference.

**4.1.1 Parsing was removed in 2.2.** Remove it from any audit template that still lists it.

## COGA: the supplemental guidance almost nobody applies

W3C-published, non-normative, and the most string-specific accessibility material that exists.

- **Use clear words.** *"Look at the most common 1500 words or phrases."* And: *"Do not invent new words or give words new meanings in your application."* If you must coin a term, the explanation must be **within one click**.
- **Use literal language.** *"Do not use metaphors and similes unless you include an explanation."* Their example of the failure: *"If you are experiencing cold feet before starting, take a deep breath and jump in."*
- **Simple tense and voice**: present and active, *"if you are writing about past or future events, do not use the present tense."*
- **Visible labels that do not disappear.** Labels *"must not disappear when the focus is removed"*. A direct prohibition on placeholder-as-label.
- **State results and disadvantages.** *"Clearly explain the benefits, risks and consequences of each option."* The confirmation-dialog rule.
- Also: avoid double negatives, keep text succinct, make implied content explicit.

## Accessible names: the shape

From the W3C ARIA Authoring Practices:

- *"Be concise. For many elements, one to three words is sufficient."*
- **Never include the role in the name.** No `Submit button` as a label.
- Unique among same-role elements.
- **Verb first:** `Edit John Doe`, not `John Doe edit`.

For a functional image, the alt text is the **action**, never the picture: a printer icon is `Print document`, not `printer icon`.

**Same rules on mobile.** In React Native the name is `accessibilityLabel` (or `aria-label`), and VoiceOver and TalkBack announce the role from `role` / `accessibilityRole` separately, so `Delete` not `Delete button`. `accessibilityHint` states the **result**, never the gesture: `Removes this dish from Tuesday`, not `Double tap to delete`. Each person's screen reader already tells them how to activate. Which props exist and when they fire belongs to a UI design or layout skill's accessibility reference.

**Label in Name has a voice-control test.** Lea, the book's persona who works by dictation (ch. 2, p. 24), says the words she sees. If the visible label is `Send` and the name is `Submit message`, `Tap Send` does nothing. The name **starts with** the visible text.

### Links

- **The link text is the destination.** The target page's title should match or nearly match it (Horton & Quesenbery, ch. 6, p. 92).
- **Say when it is not a page.** `Q3 statement (PDF, 640 KB)`. A file that opens a viewer or starts a download is a surprise otherwise (ch. 8, p. 138).
- **In a list of similar links, lead with the word that differs.** `Tuesday menu`, `Wednesday menu`, not `Menu for Tuesday`. People scan link lists by their first words, by eye and by ear (ch. 8, p. 138).
- **One link per card.** An image, a headline, and `Read more` all pointing at one place are three tab stops and three announcements. Link the headline; the rest is not a link (ch. 8, p. 138).
- **Never put meaning in a `title` attribute.** Touch, keyboard, and many screen readers never show it. If the link needs it, the link text is wrong (ch. 8, p. 139, still true).

## Readability target

**6th-grade Flesch-Kincaid.** Short sentences. Few adverbs and adjectives. Simple tenses. Active voice by default.

**But know where that number comes from.** Adobe sets the Flesch-Kincaid target. **W3C does not endorse readability formulas at all.** WCAG 3.1.5 defines its bar as "lower secondary education level" (7 to 9 years of schooling) and calls for evaluation by *"qualified teachers"* against local standards, noting that *"the concept of Easy to Read cannot be universal."* Its remedy for hard content is a **supplement or alternate version**, not simplifying the original.

Use the formula as a working instrument, not as evidence of conformance. It is a proxy that vendors adopted and the standards body declined to.

Horton & Quesenbery reached the same verdict in 2014, and it held: formulas count syllables and sentence length, which says little about whether a reader can **use** the text. Their one legitimate job is an early warning for long sentences and long words (ch. 8, pp. 141–143). The real test is a person from the audience reading the real string. And never in lorem ipsum: test copy is real copy (p. 144).

**The standard that exists now.** ISO 24495-1:2023, *Plain language, Part 1*, defines plain language by outcome: readers can **find** what they need, **understand** it, and **use** it. Its four principles are relevant, findable, understandable, usable ([ISO](https://www.iso.org/standard/78907.html)). That is the definition Ginny Redish gives in the book (ch. 8, p. 147), now an international standard. Cite it when a client asks for a plain-language bar that is not a grade level.

**Order inside the sentence.** Condition before instruction: `If you're sending a gift, write the card message here`, not the reverse (ch. 8, p. 132). A reader who does not meet the condition stops after four words, and a screen reader user does not have to hold the instruction in memory while waiting to learn whether it applies.

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
| **You** | Users | Speak to the person, not about them. `User` is fine when the sentence is about a role, such as an admin managing permissions |
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

**Terms borrowed from disability as metaphor**, which are the ones that slip into product copy without anyone noticing:

| Prefer | Avoid |
|---|---|
| Unavailable, turned off, deactivated | Grayed out |
| Coherence check, sense check | Sanity check |
| Ridiculous, unpredictable | Crazy |
| Inconsiderate | Tone-deaf |
| Incompetent, bad | Dumb, lame |
| Placeholder variable | Dummy variable |
| Organised, tidy | OCD |

### Race and class

| Prefer | Avoid |
|---|---|
| Allowlist / blocklist | Whitelist / blacklist |
| Primary, main, source | Master (as descriptor) |
| Primary / secondary | Master / slave |
| Legacy | Grandfathered |
| Dark brown, beige, tan, peach | Skin, flesh, nude (as a colour) |
| Guide | Sherpa |
| Expert, authority | Guru, ninja |
| Meeting | Pow wow, circle the wagons |
| Role model | Spirit animal |
| Welcome back | Long time no see |
| Something went wrong | No can do |

`Dark mode`, `light theme`, `black screen` are fine. They describe brightness, not value.

**Name examples carry a lot.** A product whose sample data is all John, Bill, and Amy has told everyone else it was not built for them. Vary them.

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

**Colour and position may be added, never alone.** `The Contact us link at the top of the page` works for everyone; `the link at the top` does not (Horton & Quesenbery, ch. 6, p. 94). The name carries the instruction; the location is a courtesy for people who can use it.

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
**For text in an image:** the alt repeats the words, and nothing about the lettering unless the lettering is the point (ch. 9, p. 155). Better: do not ship text as an image (WCAG 1.4.5).
**For a decorative image:** empty alt (`alt=""`), or `aria-hidden` in React Native. Absent alt is not the same thing: a screen reader then reads the file name.

### Charts and complex images

The alt says what the chart **shows**, in one sentence with the finding: `Bar chart: weekly orders rose from 40 to 65 between June and August.` The data sits in a real table or list next to it, which people who prefer numbers use too (ch. 8, p. 136).

**The book's long-description advice is dated.** It discussed the HTML `longdesc` attribute as an open debate (ch. 9, p. 158). `longdesc` is obsolete. Put the long description in visible adjacent text or a linked page, and connect it with `aria-describedby`.

**Generated alt text is a draft.** A model or the platform can describe what is in a photo. It cannot know why the photo is on this page, which is what alt text is for. A person writes or approves every alt string that ships.

---

## Captions and transcripts

The book's caption conventions (ch. 9, pp. 161–162) held up and are the words half of WCAG 1.2:

- **Every spoken word, plus every sound that matters.** Non-speech in square brackets: `[phone ringing]`, `[music stops]`. Name the song when the song is the point.
- **Name the speaker** when the picture does not show who is talking: `MARIA: It's all here.`
- **Break lines at phrase boundaries**, never mid-phrase. One sentence ends, the next caption starts.
- **Tone when it changes meaning:** `(whispering)`, `(sarcastic)`.
- **Automatic captions are a first draft.** The book called them "often not very good" (p. 161). They are much better now and still mishear names, dishes, numbers, and product terms, which are exactly the words that matter. Edit every one against the lexicon before publishing.
- **A transcript sits next to the player**, not on another page (p. 163). It serves anyone without audio, anyone reading in a second language, and search.

Captions cover what is heard. For what is only seen (a demo with no narration), add the missing information to the narration or supply audio description.

---

## Forms

The words only. Structure, grouping, error placement, autocomplete, and authentication mechanics are in a UI design or layout skill's forms reference.

- **Never `Clear` or `Reset`** on a form. One mis-tap destroys real work.
- **Let people save and come back.** Especially anything long.
- Label and instruct enough that the error never fires.
- Errors described in text, not by colour or icon alone.
- Keywords **before or inside** the link, never after.
- **Say what to have ready before step one.** The documents, the numbers, the time it takes. The book's Emily completes a whole form, then learns at the office that she needed paperwork nobody mentioned (ch. 10, p. 184).
- **A timeout warning says how long, and how to keep going:** `You'll be signed out in 2 minutes. Stay signed in`. Pair it with work that survives the timeout (ch. 5, p. 82). The timing rule is WCAG 2.2.1.

## Layout facts that change the writing

These are the layout facts a writer controls. Contrast, text size, zoom, reflow, and text-spacing numbers are in a UI design or layout skill's accessibility reference.

- Left-align running text. Justified text creates rivers of white space that are hard to read with dyslexia.
- 50–75 characters per line, maximum. (WCAG 1.4.8 AAA sets the outer limit at 80.)
- **Strings must survive growth.** Dynamic Type at its largest accessibility size and Android's 200% font scale wrap a two-word label onto three lines. Write the short form first, and never fix overflow by locking the text size.
- **Do not change the font to make text accessible.** Specialist dyslexia fonts showed no gain in reading rate or accuracy ([Wery & Diliberto, 2017](https://pubmed.ncbi.nlm.nih.gov/26993270/)), which dates the book's font advice (ch. 7, p. 121). Short words, short sentences, and space do the work.
- Sentence case. **All caps only for acronyms.** See the divergence note in `directness.md` for where this skill deliberately differs.
- Camel case in hashtags so screen readers can parse them: `#CamelCase`.
- Spell out an uncommon acronym on first use, shortened form in parentheses after.
- Avoid homonyms, or make the sense obvious from context.

## Idioms

Cut them. They translate badly, and several common ones started as mockery of the people who would now be reading them. `Long time no see` and `no can do` both have that history. `Wax on, wax off` means nothing outside one film in one country.

Plain language is not blander. It just reaches everybody.

---

## Where the book is dated (the words half)

*A Web for Everyone* (2014) is still right about most of the words. Corrections:

| The book | Now |
|---|---|
| WCAG 2.0 criteria throughout | WCAG 2.2. New string-relevant criteria since: 2.5.3 Label in Name and 4.1.3 Status Messages (2.1); 3.2.6, 3.3.7, 3.3.8 (2.2). 4.1.1 removed |
| `longdesc` for complex images (ch. 9, p. 158) | Obsolete. Adjacent text or a linked page, joined with `aria-describedby` |
| Automatic captions "often not very good" (ch. 9, p. 161) | Better, still a draft. Edit names, numbers, and terms every time |
| Dyslexia fonts and named sans-serifs (ch. 7, pp. 119–121) | No evidence the special fonts help. Keep the brand typefaces; plain words and space carry it |
| CAPTCHA as a usability complaint (ch. 5, p. 68) | A AA failure under 3.3.8 when it is the only way in |
| Plain language as practice | ISO 24495-1:2023 makes it a standard: find, understand, use |

**What held, and is already in this file:** readability formulas are a warning light, not a verdict (pp. 141–143); links say where they go (pp. 138–139); instructions never rely on colour or position alone (ch. 9, p. 154); and the persona of a reader who takes every word literally (Trevor, ch. 2, p. 18) is the reason COGA's no-metaphor rule exists.
