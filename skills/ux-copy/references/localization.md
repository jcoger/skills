# Localization constraints on the English source

**Read the gate first.** Everything here binds only if the product ships, or plans to ship, in more than one language. A single-market product can ignore most of it, and should, because several of these rules trade elegance for translatability.

> **The gate:** does this product ship in more than one language, now or on the roadmap? If no, this file is advisory. If yes, six rules elsewhere in this skill **invert**, and they are listed below.

---

## The six inversions

Do not silently apply these. If a product is localized, say which rule you are inverting and why.

| This skill normally says | Localization says | Source |
|---|---|---|
| Shortest possible label | **The shortest labels are the most dangerous.** Under 10 characters expands 200–300% | W3C / IBM |
| Punchy fragments: `Access denied` | *"say **Access is denied** instead of **Access denied**"*. Include the verb | Microsoft |
| Drop articles in labels | *"Include articles, such as the. Articles help readers and translation software identify the nouns and modifiers"* | Microsoft |
| `Page 1 of 10` is a model of concision | Fixed variable positions are a defect. *"The syntax of other languages may require the numbers to be reversed"* | W3C |
| One concept, one word: reuse the label | **Duplicate it per context.** `Order` as a verb and `Order` as a noun are two translation units | Apple, Mozilla |
| *(no inversion, see Corrections below)* | Contractions are **not** banned. Only the ambiguous ones: `there'd`, `it'll`, `they'd` | Microsoft, Google |

And one more that is not an inversion but surprises people: **wit does not survive.** Google: *"Avoid humor. Most humor is difficult to translate, and much humor is culturally specific."* A localized product's personality has to live in structure and specificity, not in jokes or idiom.

---

## ALL CAPS is a correctness bug, not a style choice

The strongest new finding, and it is not a preference.

Unicode's `SpecialCasing.txt` is normative: case mappings *"depend on language and perhaps also context."*

- **German `ß` uppercases to `SS`.** One character becomes two, so a CSS `text-transform: uppercase` **changes the string's length** at render time.
- **Turkish and Azeri:** uppercase `I` lowercases to dotless `ı`; lowercase `i` uppercases to dotted `İ`. An untagged uppercase transform produces **wrong Turkish**.

Combined with Microsoft's *"Don't use all uppercase for emphasis"*, a caps transform used for hierarchy is a style violation **and** a bug in two named languages.

**The precise scope, because it matters:** the bug is in `text-transform`, not in the letters. A string authored in caps in the source is not miscased at runtime, but it hands a translator a styling decision they cannot reproduce, and any locale that uppercases it inherits the `ß` and `i` problems. **If a product uses caps labels and plans to localise, author them sentence case and cap them in the component with a language tag, or accept that the pattern does not travel.**

## Collation: an A–Z scrubber is an untranslatable design decision

UTS #10: *"Because collation varies by language and not just by script, it is not possible to arrange the encoding for characters so that simple binary string comparison produces the desired collation order for all languages."*

Swedish places `z` before `ö`; German the reverse. Within German, dictionary order puts `öf` before `of` and phonebook order reverses it.

CLDR index characters *"are adapted to the underlying collation"*: a Greek index bar is Α Β Γ Δ, not A B C. **"Alphabetical list with an A–Z scrubber" is a design decision that does not survive translation**, and it is worth flagging as a copy-adjacent finding because nobody else will.

## String expansion

The instrument is the **length band**, not the language.

| English source | Expect total length |
|---|---|
| Up to 10 chars | **200–300%** |
| 11–20 | 180–200% |
| 21–30 | 160–180% |
| 31–50 | 140–160% |
| 51–70 | **130–140%** |
| Over 70 | 130% |

*The 51–70 row is printed as 151–170% in the [W3C article](https://www.w3.org/International/articles/article-text-size), which breaks the otherwise monotonic decline. tcworld reproduces the same IBM table as* additional *space and it resolves to 131–140%. Five of six rows corroborate. Use 130–140%. IBM's own page is unreachable, so this is a strong inference, not a direct read.*

**The rule that follows: a short label needs the most headroom, not the least.** A 6-character button is the row that triples.

Microsoft's working heuristic: **lengthen by 40%** when testing, knowing extremes reach 200–400%. *"Strings that are one or two words commonly grow proportionally longer than strings with more words."*

**Do not use per-language multipliers.** The only per-language data in the W3C article is a single 5-character word (`views`), which is the worst case on the curve. Quoting "German is 2.8×" from it is a misread.

**CJK does not simply contract.** It contracts in character count and **expands vertically**: taller glyphs, more leading. W3C: *"It is very common for non-Latin text to have much taller characters than Latin text."*

---

## Concatenation

**The single highest-value rule in this file: never build a sentence from parts.**

Microsoft's worked failure, for `"You have " + n + " item" + "s" + " in your shopping cart."`:

1. **Fragments arrive unordered.** Resource files sort by key, so the translator sees `InYourShoppingCart`, `Item`, `YouHave` as three unrelated rows with no idea they combine. *This is exactly why sentence pieces in a spreadsheet cannot be translated.*
2. **The appended `s` fails three ways**: Italian changes the stem, Japanese does not inflect, Russian needs three forms.
3. **Hardcoded `.`** is wrong for Japanese (`。`) and Thai.
4. **Hardcoded spaces** are wrong for Chinese and Ge'ez.
5. **Word order.** Japanese renders as *"(You) shopping cart in 5 items have."* No reordering of those fragments produces it.

Microsoft's fix, with an explicit admission of the trade: `"Items in the shopping cart: {0}"`. *"While this version of the string might not be as elegant, the translators have full control."*

**Word order is not a minor variation.** Across 1,377 languages, **SOV (564) outnumbers SVO (488)**. English word order is not the majority pattern.

**Embedded links are concatenation in disguise.** Splitting a terms sentence into `text` + `link` fails, because some languages need a third fragment *after* the link to form a natural sentence.

**Every placeholder needs a name and a comment.** Android carries an example inline: `<xliff:g id="time" example="5 days">%1$s</xliff:g>`. Mozilla: *"always add a localization comment explaining what these variables mean, even if it seems obvious."*

**Change the string ID when the meaning changes**, or translators keep a stale translation.

---

## Plurals

**`if (n === 1)` is broken in most of the world.**

CLDR: *"A common mistake is to think that 'one' is only for only the number 1. Instead, 'one' is a category for any number that behaves like 1."* In Russian, **21, 31, 101** all take the `one` branch.

**The rule that changes how you write the string**. Android, verbatim:

> *"Always include %d in 'one' because translators will need to use %d for languages where 'one' doesn't mean 1."*

**So you may not write `1 item` in the singular branch.** It must be `%d item`, because that branch also renders 21 and 101 elsewhere.

| Language | Categories |
|---|---|
| Arabic, Welsh | **6**: zero, one, two, few, many, other |
| Irish, Breton, Maltese | 5 |
| Russian, Polish, Czech, Slovenian | 4 |
| Latvian, Hebrew, French, Spanish | 3 |
| English, German | 2 |
| Japanese, Chinese, Korean | **1** |

*Maltese has no `zero`. Only Arabic and Welsh use all six.*

**English itself breaks on ordinals.** Cardinals need 2 forms; **ordinals need 4**: `1st` (one), `2nd` (two), `3rd` (few), `4th` (other). Most English writers do not know their own language needs a four-way switch.

Do not abuse plurals as a general if-statement: languages with only `other` will always render that branch.

**ICU MessageFormat 2.0 is stable** as of CLDR 47 (March 2025); current spec is TR35 Part 9 v48.2. The ICU user guide's `mf2.html` still says "technical preview" and is stale. Structural rule: `select` outermost, `plural` nested, and *"write full sentences in their sub-messages."*

---

## Bidi and placeholders

RTL is not just mirroring. **Every placeholder mid-sentence is a direction boundary**, and a two-placeholder string in an RTL locale is a five-segment reordering problem.

**A phrase needs isolation when it** *(W3C, verbatim)*:
- begins or ends with neutral characters
- begins with a number
- is followed by a number
- is followed by another, logically separate, opposite-direction phrase
- contains a nested phrase of opposite base direction

Each maps to an authoring habit you can avoid:

| Rule | Confidence |
|---|---|
| **Never put two placeholders adjacent** | direct |
| **No number immediately before or after a placeholder** | direct |
| **Never write `{value}%`, `-{value}`, `${value}` literally**. Format the quantity as one unit | direct |
| **Use the platform's formatting API, never hand-interpolation** | direct |
| No punctuation immediately adjacent to a placeholder | derived |
| Do not wrap a placeholder in parentheses or brackets | derived |
| Give every placeholder a real word on both sides | derived |

Apple: the minus and percent signs sit on **different sides of the number** in Arabic and Hebrew. *"In fact, it doesn't have to be a right to left language at all. Notice that in Turkish, which is a left to right language, the percent sign also goes on the left."*

Apple's `String(localized:)` inserts the bidi isolates for you. **Manual concatenation bypasses that protection.**

Modern practice is the isolate characters `U+2066`–`U+2069` (LRI/RLI/FSI/PDI), not the older embeddings. Use `<bdi>` in HTML, `FSI…PDI` in plain-text contexts: `alt`, `title`, log lines, **push notification payloads**.

---

## Pseudo-localization

The QA technique with no monolingual equivalent. Run the build in a pseudo-locale and read the screens.

What it catches that nothing else does:

- **Unexternalized strings**: they appear *unaccented*. Nothing else surfaces these automatically.
- **Concatenation**: paired delimiters appear mid-message. Microsoft's example is the clearest artifact in the whole topic:
  ```
  Concatenated:  [!!!You have !!!]5[!!! items in your shopping cart.!!!]
  Whole string:  [!!!You have 5 items in your shopping cart.!!!]
  ```
- **Truncation**: the closing delimiter is missing.
- **Font gaps**: foreign-script padding reveals tofu.
- **Bidi bugs**: Android's test: `pseudolocales rule!` should become `!elur selacoloduesp`. If the `!` stays on the right, bidi is broken.

**Android:** `en-XA` (accents + expansion + brackets) and `en-XB` (RTL mirror). Enable with `pseudoLocalesEnabled true` in the debug build type.
**Xcode:** Scheme → Options → Application Language → Double Length Pseudolanguage, Right-to-Left Pseudolanguage. *(Accented and Bounded String variants are menu-verified; the current Apple doc page 404s.)*
**Windows:** `qps-ploc`. Use the reserved `qaa`–`qtz` range. Microsoft once used `tk-TM`, which later shipped as a real locale and broke their builds.

---

## Names and personal data

W3C's *[Personal names around the world](https://www.w3.org/International/questions/qa-personal-names)* is the reference. The failure modes: family-name-first (Chinese, Japanese, Korean, Hungarian), multiple family names (Spanish, Brazilian), patronymics (Icelandic, Russian), **no family name at all** (parts of South India, Malaysia, Indonesia), honorifics, and sorting: Thai and Icelandic sort by *given* name.

Verbatim guidance worth adopting outright:

- *"ask yourself whether you really need to have separate fields for given name and family name"*
- Add *"What should we call you?"*
- *"Don't assume that a single letter name is an initial"*
- *"Don't require that people supply a family name"*
- *"Don't normalize the casing in names"*
- *"do not assume that a four-character Japanese name in UTF-8 will fit in four bytes"*. You are likely to actually need 12.

---

## Reuse, and the mechanism for breaking it

gettext's canonical example is literally the word this skill keeps arguing about: File menu `Open` and Printer menu `Open` are **two translation units**, `pgettext("Menu|File|", "Open")` and `pgettext("Menu|Printer|", "Open")`. Angular's equivalent example is `right`: correct versus direction.

Every platform has the mechanism: gettext `msgctxt`, Angular `meaning|description@@id`, Chrome `description`, Android XML comment, Apple's String Catalog comment column, XLIFF `<note>`.

**Apple's anti-composition rule is the clearest statement of the whole problem:**

> Don't overload keys or compose phrases from multiple keys. Some languages have gender articles, adjective endings, and completely different word order. Instead, add a separate key-value pair for all unique phrases.

Bad: `"Go to next %@"` + `chapter` + `page`. Good: two full keys, `GoToNextChapter` and `GoToNextPage`.

**Mozilla explicitly forbids sharing a string between a menu item and the screen header it opens.** DRY is wrong here.

## Two more things that do not travel

**Keyboard mnemonics.** English `Next` with mnemonic `x` has no `x` in French `Suivantes`. Optimal accelerator letters differ by language because letter frequency does.

**Abbreviation schemes.** US English abbreviates weekdays to one letter (M, T, W). **Catalan needs two and has no single-letter form. Arabic does not abbreviate weekdays at all.** Any design that budgets one character per weekday is a monolingual design.

## The only hard numbers that exist

| Number | Rule | Source |
|---|---|---|
| **2** | Max nouns modifying another noun | Google |
| **3, prefer 2** | Max phrases or clauses linked by and/or/but | Microsoft |
| **6** | Max plural forms in any language | CLDR |
| **200–300%** | Expansion on sub-10-character strings | IBM via W3C |
| **40%** (30% in .NET) | Pseudo-localization expansion heuristic | Microsoft |

**A critical negative: no numeric sentence-length limit exists anywhere.** Not in Google, Microsoft, W3C, Apple, or Mozilla. Microsoft's operational test is **comma count**, not word count: *"Punctuating a sentence with more than a few commas and end punctuation usually indicates a complex sentence."* Any "max 20 words" rule is a house rule and cannot be attributed to these sources.

## Corrections to common myths

**Contractions are not banned.** Microsoft *encourages* the common ones (*"it's, you're, that's, don't"*), and bans only the ambiguous (`there'd`, `it'll`, `they'd`) and mixing contracted with spelled-out forms in one UI. Google bans only *uncommon* contractions. **Neither cites a translation rationale.** This corrects a widespread misreading, including the earlier row in the inversions table above. The rule is about ambiguity, not about translation.

**There is no source anywhere saying avoid "sorry" for global audiences.** If a product bans it, that is a house rule. What *is* verified is **`please`**: Microsoft says avoid it except when asking for something genuinely inconvenient or when the product is at fault. Google: *"Using please in a set of instructions is overdoing the politeness."* Both are English house rules, not i18n rules.

**Material Design has no sentence-case localization rationale.** Do not cite it. Microsoft's rule is the only citable one, and its strength is that it appears *inside the Global communications section*, stated as a localization rule, not a style preference.

## What the English writer owes the translator

From Google and Microsoft's global-communications guidance:

- **Short sentences.** *"The shorter the sentence, the easier it is to translate."*
- **No more than two nouns modifying another noun.** The one hard number available.
- **Avoid gerunds and participles**: `-ing` and `-ed` are role-ambiguous in English.
- **Avoid phrasal verbs** where possible. `set up`, `log in`, `sign in` are established exceptions.
- **Keep `that` and `who`**: they clarify sentence structure.
- **Keep articles.**
- **Replace an ambiguous pronoun with the noun.** *(Same conclusion as Gate Q, arrived at from a different direction.)*
- **One word per concept, used consistently.**
- **Limit sentence fragments.**
- **Sentence case.** Title Case is not a convention in most languages, and in German capitalization carries grammatical meaning rather than style.
- **Avoid seasons and hemisphere assumptions.** `Spring release`, `Summer sale`. Google: *"Avoid geographically specific references, like the seasons."*
- **Address the reader as `you`**, not `the user` or `they`. Beyond tone, this sidesteps third-person gender agreement in the target language.
- **Avoid directional language**: same conclusion as Gate K, reached from RTL and reflow rather than from screen readers.
- **No idioms, slang, or culture-specific references.** `ballpark figure`, `back burner`, `hang in there` do not travel.

**Register is not yours to set.** German `du`/`Sie`, French `tu`/`vous`, Japanese keigo level are decided **once per market** in that locale's style guide, not per string. What the English source supplies is the register *signal*, and a string like `Sorry, that didn't work` encodes an informal, apologetic stance a locale guide may forbid.

Microsoft says the quiet part out loud: global writing guidance contains *"a few exceptions to general Microsoft voice and style guidance."* **Localization and brand voice genuinely conflict, and somebody has to decide which wins per surface.** The trust spectrum is the place to make that call: structure-leads surfaces should follow localization; voice-leads surfaces are where a single-market flourish can survive, if the product accepts it will be flattened in translation.

---

## Sources

[W3C text size](https://www.w3.org/International/articles/article-text-size) · [W3C inline bidi markup](https://www.w3.org/International/articles/inline-bidi-markup/) · [W3C personal names](https://www.w3.org/International/questions/qa-personal-names) · [Microsoft concatenation](https://learn.microsoft.com/en-us/globalization/internationalization/concatenation) · [Microsoft pseudolocalization](https://learn.microsoft.com/en-us/globalization/methodology/pseudolocalization) · [Microsoft global writing tips](https://learn.microsoft.com/en-us/style-guide/global-communications/writing-tips) · [Android string resources](https://developer.android.com/guide/topics/resources/string-resource) · [Android pseudolocales](https://developer.android.com/guide/topics/resources/pseudolocales) · [CLDR plural rules](https://www.unicode.org/cldr/charts/48/supplemental/language_plural_rules.html) · [Mozilla l10n best practices](https://mozilla-l10n.github.io/documentation/localization/dev_best_practices.html) · [Google translation style](https://developers.google.com/style/translation) · [UAX #9](https://www.unicode.org/reports/tr9/)

*Note: Android's concatenation guidance is on the **pseudolocales** page, not the localization page. Per-language expansion percentages circulating on vendor blogs are mutually inconsistent. Do not cite them.*
