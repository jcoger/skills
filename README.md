<!-- Banner goes here in wave 2: assets/banner.png -->

# Skills for designers who build

I design products. Then I build them. These are the skills I use to do both in Claude Code.

I came to design from finance, so I think in outcomes first and craft second. Every skill here started as a fix for something a coding agent kept getting wrong on a real project: screens that drifted off the design system, marketing pages built in the company's order instead of the visitor's, buttons that said `Submit`.

## Install

```bash
npx skills add jcoger/skills
```

Or as Claude Code plugins, with the slash commands:

```
/plugin marketplace add jcoger/skills
/plugin install mobile-kit@jcoger-skills
/plugin install marketing-stack@jcoger-skills
/plugin install ux-copy@jcoger-skills
```

## The kits

### [Mobile Kit](kits/mobile.md)

Seven skills for React Native and Expo apps that feel native and hold one design system from the first commit to the App Store. Ships a token-lint script that catches design drift and fails the review.

- **[mobile-scaffold](skills/mobile-scaffold/SKILL.md)**: the day-one gate. The choices that are cheap now and brutal in week six.
- **[mobile-architecture](skills/mobile-architecture/SKILL.md)**: nav graph, structure, state, performance.
- **[mobile-design](skills/mobile-design/SKILL.md)**: tokens, screen recipes, and one signature moment per app.
- **[mobile-motion](skills/mobile-motion/SKILL.md)**: springs and gestures that feel like iOS and Android, not the web.
- **[mobile-audit](skills/mobile-audit/SKILL.md)**: holds every screen to the system.
- **[mobile-ship](skills/mobile-ship/SKILL.md)**: proves the release build before the store does.
- **[mobile-engage](skills/mobile-engage/SKILL.md)**: the retention loop and every push notification, mapped.

Commands: `/mob` routes to the right one. `/mob-scaffold`, `/mob-arch`, `/mob-design`, `/mob-motion`, `/mob-review`, `/mob-ship`, `/mob-engage` call them directly.

### [Marketing Stack](kits/marketing.md)

Nine skills that take a marketing site from a blank page to shipped code. Each one makes one decision and hands the next a written spec, so nothing gets lost on the way to code.

- **[marketing-site-architecture](skills/marketing-site-architecture/SKILL.md)**: which pages exist and what each one is for.
- **[conversion-architecture](skills/conversion-architecture/SKILL.md)**: the argument, in the visitor's order.
- **[retrieval-architecture](skills/retrieval-architecture/SKILL.md)**: pages that search engines and AI answers can quote.
- **[marketing-page-layout](skills/marketing-page-layout/SKILL.md)**: sections, sizing, and a way out of the five-section template.
- **[design-craft-library](skills/design-craft-library/SKILL.md)**: a pattern library you grow from sites you admire.
- **[motion-direction](skills/motion-direction/SKILL.md)**: one motion personality, section by section.
- **[product-choreography](skills/product-choreography/SKILL.md)**: storyboards for the hero animation.
- **[animation-craft](skills/animation-craft/SKILL.md)**: builds it, on web, React Native, SwiftUI, or video.
- **[web-build](skills/web-build/SKILL.md)**: turns the specs into a build plan and a kickoff prompt.

Commands: `/mk-plan`, `/mk-convert`, `/mk-cite`, `/mk-page`, `/mk-find`, `/mk-extract`, `/mk-motion`, `/mk-story`, `/mk-anim`, `/mk-build`, `/mk-review`.

### [ux-copy](kits/ux-copy.md)

The words inside a product: buttons, errors, empty states, permission prompts, confirmations, alt text. Write a whole screen's strings, fix one, or sweep an app for copy debt.

## Also by me

- [eagle-refs](https://github.com/jcoger/eagle-refs): tag an Eagle reference library with vision models and search it from Claude Code.
- [FontDrop](https://github.com/jcoger/FontDrop): a Mac app for picking logo type.

## License

MIT. Made by [Jarrett Coger](https://jcoger.com).
